import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {authRouter} from "./routes/auth"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});