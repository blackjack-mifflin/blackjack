const router = require('express').Router();
const { Socket } = require('dgram');
const http = require('http');
const server = http.createServer(router);
const {Server} = require('socket.io');
const io = new Server(server);

router.get('/', (req, res) => {
  res.send('reached game route');
});

io.on("connection", (socket) => {
  console.log('A user has connected!');
  socket.on('move', (move) => {
    const card = 'sA';
    console.log(move);
    io.emit('cards', card);
  })
  Socket.join("gameId");
})

const cardValues = {
  sA: {notBust:10, bust: 1},
  cA: 10,
  hA: 10,
  dA: 10,
  sK: 10,
  cK: 10,
  hK: 10,
  dK: 10,
  sQ: 10,
  cQ: 10,
  hQ: 10,
  dQ: 10,
  sJ: 10,
  cJ: 10,
  hJ: 10,
  dJ: 10,
  sT: 10,
  cT: 10,
  hT: 10,
  dT: 10,
  s9: 9,
  c9: 9,
  h9: 9,
  d9: 9,
  s8: 8,
  c8: 8,
  h8: 8,
  d8: 8,
  s7: 7,
  c7: 7,
  h7: 7,
  d7: 7,
  s6: 6,
  c6: 6,
  h6: 6,
  d6: 6,
  s5: 5,
  c5: 5,
  h5: 5,
  d5: 5,
  s4: 4,
  c4: 4,
  h4: 4,
  d4: 4,
  s3: 3,
  c3: 3,
  h3: 3,
  d3: 3,
  s2: 2,
  c2: 2,
  h2: 2,
  d2: 2
};

const deck = [
  'sA',
  'cA',
  'hA',
  'dA',
  'sK',
  'cK',
  'hK',
  'dK',
  'sQ',
  'cQ',
  'hQ',
  'dQ',
  'sJ',
  'cJ',
  'hJ',
  'dJ',
  'sT',
  'cT',
  'hT',
  'dT',
  's9',
  'c9',
  'h9',
  'd9',
  's8',
  'c8',
  'h8',
  'd8',
  's7',
  'c7',
  'h7',
  'd7',
  's6',
  'c6',
  'h6',
  'd6',
  's5',
  'c5',
  'h5',
  'd5',
  's4',
  'c4',
  'h4',
  'd4',
  's3',
  'c3',
  'h3',
  'd3',
  's2',
  'c2',
  'h2',
  'd2'
]



module.exports = router;