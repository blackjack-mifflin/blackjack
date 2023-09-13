const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
app.use(require("body-parser").json());
const jwt = require("jsonwebtoken");
const http = require('http');
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);
const cors = require('cors');
app.use(cors());

<<<<<<< HEAD
/* class Room {
  constructor() {
    this.id = 1;
    this.deck = ['sA', 'dA', 'hA', 'cA'];
    this.players = [];
  }
}
const roomsArr = [];
 */
io.on('connection', (socket) => {
  const deck = ['sA', 'dA', 'hA', 'cA'];
  console.log(`user connected! ${socket.id}`);
  socket.on('move', (move) => {
    if (move === 'hit') {
      newCard = deck.pop();
      io.emit('card', newCard);
    } else if (move === 'stick') {
      io.emit('player', 'move player pointer 1+');
    }
    console.log(`MOVE FROM CLIENT: ${move}`);
    // socket.emit('new message', move);
    // socket.broadcast.emit | this sends message to everyone except for the socket message was received from
    // io.emit | this sends message to everyone including the socket message was received from
  })
});

app.use(morgan('dev'));
app.use(require("body-parser").json());

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
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));


server.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server is listening on ${process.env.PORT}`);
  } else {
    console.log('Not Working');
  }
});

