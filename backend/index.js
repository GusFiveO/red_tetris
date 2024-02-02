const express = require('express');
const cors = require("cors")
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

let authRoute = require("./routes/auth")

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
