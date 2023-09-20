const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
app.use(morgan("dev"));
app.use(require("body-parser").json());
app.use(cors());

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

newDeck = [
  "sA",
  "cA",
  "hA",
  "dA",
  "sK",
  "cK",
  "hK",
  "dK",
  "sQ",
  "cQ",
  "hQ",
  "dQ",
  "sJ",
  "cJ",
  "hJ",
  "dJ",
  "sT",
  "cT",
  "hT",
  "dT",
  "s9",
  "c9",
  "h9",
  "d9",
  "s8",
  "c8",
  "h8",
  "d8",
  "s7",
  "c7",
  "h7",
  "d7",
  "s6",
  "c6",
  "h6",
  "d6",
  "s5",
  "c5",
  "h5",
  "d5",
  "s4",
  "c4",
  "h4",
  "d4",
  "s3",
  "c3",
  "h3",
  "d3",
  "s2",
  "c2",
  "h2",
  "d2",
];
shuffle = (deck) => {
  const newCards = [];
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};
class Room {
  constructor(playerCount) {
    this.playerCount = playerCount;
    this.deck = newDeck;
    this.activePlayer = 0;
    this.activeCard = 0;
    this.playerCards = [];
  }
  startHand = () => {
    shuffle(this.deck);
    for (let i=0; i <= this.playerCount; i++) {
      this.playerCards.push([this.deck[this.activeCard], this.deck[this.activeCard+1]]);
      this.activeCard += 2;
    }
  }
  addPlayer = () => {
    playerCount ++;
  }
  removePlayer = () => {
    playerCount --;
  }
  hit = () => {
    this.playerCards[this.activePlayer].push(this.deck[this.activeCard]);
    this.activeCard ++;
  }
  stick = () => {
    this.activePlayer ++;
  }
}
const rooms = {};
const myRoom = new Room(1);
myRoom.startHand();
myRoom.hit();
myRoom.stick();
myRoom.hit();
myRoom.hit();
myRoom.hit();
console.log(`MY ROOM: ${JSON.stringify(myRoom)}`);

io.on("connection", (socket) => {
  const joinRoom = (roomName, roomNum) => {
    if (!io.sockets.adapter.rooms.get(roomName)) {
      rooms.roomName = new Room(1);
      rooms.roomName.startHand();
      console.log("No Users in Room");
      console.log(`${roomName} DECK: ${rooms.roomName.deck}`);
      console.log(`${roomName} DEALER: ${rooms.roomName.playerCards[0]}`)
      console.log(`${roomName} PLAYER1: ${rooms.roomName.playerCards[1]}`)
      socket.join(roomName);
      io.to(roomName).emit("addedId", roomName);
      console.log(`Added ${socket.id} to ${roomName}`);
      console.log(io.sockets.adapter.rooms.get(roomName).size);
    } else if (io.sockets.adapter.rooms.get(roomName).size < 3) {
      socket.join(roomName);
      io.to(roomName).emit("addedId", roomName);
      console.log(`Added ${socket.id} to ${roomName}`);
      console.log(io.sockets.adapter.rooms.get(roomName).size);
    } else {
      roomNum++;
      roomName = `Room${roomNum}`;
      rooms.roomName = new Room(1);
      rooms.roomName.startHand();
      console.log(`NEW ROOM: ${roomNum}`);
      console.log(`${roomName} DECK: ${rooms.roomName.deck}`);
      joinRoom(roomName, roomNum);
    }
  };

  socket.on("join", (join) => {
    let roomNum = 1;
    let roomName = `Room${roomNum}`;
    joinRoom(roomName, roomNum);
  });

  socket.on("message", ({ name, message }) => {
    console.log(`MESSAGE FROM ${name}: ${message}`);
    io.emit("new message", { name, message });
  });

  socket.on("move", (move) => {
    if (move === "hit") {
      newCard = deck.pop();
      io.emit("card", newCard);
    } else if (move === "stick") {
      io.emit("player", "move player pointer 1+");
    }
    console.log(`MOVE FROM CLIENT: ${move}`);
  });
});

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

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

server.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(`Server is listening on ${process.env.PORT}`);
  } else {
    console.log("Not Working");
  }
});
