// const express = require('express');
// const app = express();
// require('dotenv').config()
// const path = require('path')
// const morgan = require('morgan');
// app.use(require("body-parser").json());
// const jwt = require("jsonwebtoken");

// app.use(morgan('dev'));
// app.use(require("body-parser").json());

// app.use((req, res, next) => {
//     const auth = req.headers.authorization;
//     const token = auth?.startsWith("Bearer") ? auth.slice(7) : null;
//     try {
//       const { id } = jwt.verify(token, process.env.JWT);
//       req.userID = id;
//     } catch (err) {
//       req.userID = null;
//     }
//     next();
//   });
// app.use(express.static(path.join(__dirname, '../client/dist')))

// app.get('/', (req, res ) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html' ))
// })

// app.use('/api', require('./api'));
// app.use('/auth', require('./auth'));

// app.listen(process.env.PORT, (error) => {
//     if(!error){
//         console.log(`Server is listening on ${process.env.PORT}`);
//     } else {
//         console.log('Not Working')
//     }
// })

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

  // Handle messages from the client
  socket.on('message', (data) => {
    const { name, message } = data; // Extract name and message from data
    io.emit('new message', { name, message }); // Emit both name and message
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
