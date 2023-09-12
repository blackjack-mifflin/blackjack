const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
app.use(require("body-parser").json());
const jwt = require("jsonwebtoken");

const cors = require('cors');
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`user connected! ${socket.id}`);
  socket.on('message', (msg) => {
    console.log(`MSG FROM CLIENT: ${msg}`);
    socket.emit('new message', msg);
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

app.get('/', (req, res ) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html' ));
});
app.get('/game', (req, res ) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html' ));
});

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

server.listen(process.env.PORT, (error) => {
    if(!error){
        console.log(`Server is listening on ${process.env.PORT}`);
    } else {
        console.log('Not Working');
    }
});