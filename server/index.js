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
app.use(morgan('dev'));
app.use(require("body-parser").json());
app.use(cors());

io.on('connection', (socket) => {
  const deck = ['sA', 'dA', 'hA', 'cA'];

  const joinRoom = (roomName, roomNum) => {
      if(!io.sockets.adapter.rooms.get(roomName)){
      console.log('No Users in Room')
      socket.join(roomName);
      io.to(roomName).emit('addedId', roomName)
      console.log(`Added ${socket.id} to ${roomName}`)
      console.log(io.sockets.adapter.rooms.get(roomName).size)
      } else if (io.sockets.adapter.rooms.get(roomName).size < 3){
        socket.join(roomName);
        io.to(roomName).emit('addedId', roomName)
        console.log(`Added ${socket.id} to ${roomName}`)
        console.log(io.sockets.adapter.rooms.get(roomName).size)
      } else {
        roomNum ++
        roomName = `Room${roomNum}`
        joinRoom(roomName, roomNum)
        }
      }

  //console.logs to be deleted later, used for now to show actions in server terminal
    socket.on('join', (join) => {
    let roomNum = 1;
    let roomName = `Room${roomNum}`;
      joinRoom(roomName, roomNum)
    })
  
    socket.on('message', (msg) => {
      console.log(`MESSAGE: ${msg}`);
      io.emit('new message', msg);
    })

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

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    req.userId = id;
  } catch (err) {
    req.userId = null;
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
