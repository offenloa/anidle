// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

var pool = require("./routes/api/pool.js");

var corsOptions = {
    origin: "http://localhost:3000"
  };

connectDB();


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pool", pool);
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));