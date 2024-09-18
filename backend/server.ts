import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Game } from './classes/Game';
import { Matrix } from './classes/utils';
import { playerScoreRouter } from './routes/playerScore';

const app = express();
const port = process.env.BACK_PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/scoreboard', playerScoreRouter);

const server = httpServer.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});

interface Games {
  [roomName: string]: Game;
}

const games: Games = {};

io.on('connection', (socket: Socket) => {
  console.log(`New socket connection ${socket.id}`);
  socket.on('joinRoom', (roomName: string, playerName: string) => {
    if (!games[roomName]) {
      console.log(`joinRoom: ${roomName}`);
      const newGame = new Game(roomName);

      newGame.on('gameOver', (playerId: string) => {
        console.log('Game Over');
        io.to(playerId).emit('gameOver', { message: 'You lost!' });
      });

      newGame.on(
        'updateGameState',
        (payload: { playerId: string; field: Matrix; score: number }) => {
          const { playerId, field, score } = payload;
          io.to(playerId).emit('updateGameState', {
            field: field,
            score: score,
          });
        }
      );
      games[roomName] = newGame;
    }

    const game = games[roomName];
    if (game.isStarted()) {
      socket.emit(
        'gameAlreadyStarted',
        'The game has already started, you cannot join.'
      );
      return;
    }

    const allOponents = game.getAllOponents(socket.id).map((player) => {
      return { id: player.id, name: player.name, firstLine: 0 };
    });
    socket.emit('currentPlayers', allOponents);

    const newPlayer = game.addPlayer(socket.id, playerName);

    if (newPlayer) {
      socket.to(roomName).emit('playerJoined', {
        id: newPlayer?.id,
        name: newPlayer?.name,
        firstLine: 0,
      });
    }

    socket.join(roomName);
  });

  socket.on('startGame', (roomName: string) => {
    const game = games[roomName];

    if (game) {
      game.start();
    }
    console.log(`Game ${roomName} started`);
  });

  socket.on(
    'playerReady',
    (payload: { roomName: string; newState: boolean }) => {
      const { roomName, newState } = payload;
      if (!games[roomName]) {
        return;
      }
      const game = games[roomName];
      const player = game.players[socket.id];
      // console.log(player.name, newState);
      player.ready = newState;
      io.to(roomName).emit('playerReady', {
        playerId: socket.id,
        state: newState,
      });
      console.log('allplayer are ready ?:', game.areAllPlayersReady());
      if (game.areAllPlayersReady()) {
        game.start();
      }
    }
  );

  socket.on(
    'playerMove',
    (moveData: { roomName: string; moveType: string }) => {
      const { roomName, moveType } = moveData;
      const game = games[roomName];

      if (game) {
        game.handlePlayerMove(socket.id, moveType);
      }
    }
  );

  socket.on('leaveRoom', () => {
    console.log(`Player disconnected ${socket.id}`);

    for (const roomName in games) {
      if (games[roomName].hasPlayer(socket.id)) {
        games[roomName].removePlayer(socket.id);
        socket.to(roomName).emit('playerLeaved', socket.id);
        if (games[roomName].isEmpty()) {
          delete games[roomName];
        }
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected ${socket.id}`);

    for (const roomName in games) {
      if (games[roomName].hasPlayer(socket.id)) {
        games[roomName].removePlayer(socket.id);
        socket.to(roomName).emit('playerLeaved', socket.id);
        if (games[roomName].isEmpty()) {
          delete games[roomName];
        }
        break;
      }
    }
  });
});

export { app, io, server };
