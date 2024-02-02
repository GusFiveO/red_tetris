// const express = require('express');
import express from 'express'
// const cors = require("cors")
import cors from 'cors'
// const cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser'
const app = express();
const port = 5000;

// let authRoute = require("./routes/auth")
import {authRouter} from "./routes/auth"

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