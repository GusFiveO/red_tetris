import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Game } from './classes/Game';
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
  socket.on('joinRoom', (roomName: string, playerName: string) => {
    if (!games[roomName]) {
      console.log(`joinRoom: ${roomName}`);
      games[roomName] = new Game(roomName);
    }

    const allPlayers = games[roomName].getAllPlayers();
    console.log('allPlayers: ', allPlayers);
    socket.emit('currentPlayers', allPlayers);

    games[roomName].addPlayer(socket.id, playerName);

    socket.to(roomName).emit('playerJoined', playerName);

    socket.join(roomName);
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected ${socket.id}`);

    for (const roomName in games) {
      if (games[roomName].hasPlayer(socket.id)) {
        const playerName = games[roomName].players[socket.id].name;
        games[roomName].removePlayer(socket.id);
        console.log(`Player Leaved ${playerName}`);
        socket.to(roomName).emit('playerLeaved', playerName);
        if (games[roomName].isEmpty()) {
          delete games[roomName];
        }
        break;
      }
    }
  });
});

export { app, io, server };
