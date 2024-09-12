import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
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

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', async (room, name) => {
    socket.data.name = name;

    const sockets = await io.in(room).allSockets(); // Get all socket IDs in the room
    const playersInRoom: string[] = [];
    socket.join(room);

    sockets.forEach((socketId) => {
      const clientSocket = io.sockets.sockets.get(socketId);
      if (clientSocket) {
        console.log(clientSocket.data.name);
        playersInRoom.push(clientSocket.data.name); // Get player info from each socket
      }
    });
    console.log('playersInRoom:');
    console.log(playersInRoom);
  });
});

export { app, io, server };
