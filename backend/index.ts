import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { Server } from 'socket.io';
import { authRouter } from './routes/auth';
import { playerRouter } from './routes/player';

const app = express();
const port = process.env.BACK_PORT;
const httpServer = createServer(app);
const io = new Server(httpServer);

// io.use(async (socket, next) => {
//   try {
//     if (socket.handshake.auth.token) {
//       next();
//     } else {
//       const err = new Error('not authorized');
//       next(err);
//     }
//   } catch (e) {
//     next(new Error('not authorized'));
//   }
// });

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'test.html'));
});

app.use('/auth', authRouter);

app.use('/player', playerRouter);

const server = httpServer.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});

// app.listen(port, () => {
