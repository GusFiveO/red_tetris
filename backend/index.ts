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

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

io.on('connection', (socket) => {
  console.log('a user connected');
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
