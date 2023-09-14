const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const cors = require('cors');

app.use(require("body-parser").json());
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.userID = id;
  } catch (err) {
    req.userID = null;
  }
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


io.on('connection', (socket) => {
  console.log(`User connected! Socket ID: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected! Socket ID: ${socket.id}`);
  });
});

// This part is the new code:
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('message', (msg) => {
    console.log(`MESSAGE: ${msg}`);
    io.emit('new message', msg);
  });
});


// Start the Express server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
