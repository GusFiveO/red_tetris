import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter } from "./routes/auth"
import { playerRouter } from './routes/player';

const app = express();
const port = process.env.BACK_PORT;


app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRouter)

app.use('/player', playerRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});