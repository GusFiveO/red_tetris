import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Game } from './classes/Game';
import { playerScoreRouter } from './routes/playerScore';
import {
  addPlayer,
  onLeaveRoom,
  onPlayerMove,
  onPlayerReady,
  onStartGame,
} from './serverHandler';

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

export interface Games {
  [roomName: string]: Game;
}

const games: Games = {};

io.on('connection', (socket: Socket) => {
  console.log(`New socket connection ${socket.id}`);
  socket.on('joinRoom', addPlayer(io, socket, games));

  socket.on('startGame', onStartGame(games));

  socket.on('playerReady', onPlayerReady(io, games, socket));

  socket.on('playerMove', onPlayerMove(socket, games));

  socket.on('leaveRoom', onLeaveRoom(io, socket, games));

  socket.on('disconnect', onLeaveRoom(io, socket, games));
});

export { app, io, server };
