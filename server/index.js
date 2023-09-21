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
  "spades_ace",
  "clubs_ace",
  "hearts_ace",
  "diamonds_ace",
  "spades_king",
  "clubs_king",
  "hearts_king",
  "diamonds_king",
  "spades_queen",
  "clubs_queen",
  "hearts_queen",
  "diamonds_queen",
  "spades_jack",
  "clubs_jack",
  "hearts_jack",
  "diamonds_jack",
  "spades_10",
  "clubs_10",
  "hearts_10",
  "diamonds_10",
  "spades_9",
  "clubs_9",
  "hearts_9",
  "diamonds_9",
  "spades_8",
  "clubs_8",
  "hearts_8",
  "diamonds_8",
  "spades_7",
  "clubs_7",
  "hearts_7",
  "diamonds_7",
  "spades_6",
  "clubs_6",
  "hearts_6",
  "diamonds_6",
  "spades_5",
  "clubs_5",
  "hearts_5",
  "diamonds_5",
  "spades_4",
  "clubs_4",
  "hearts_4",
  "diamonds_4",
  "spades_3",
  "clubs_3",
  "hearts_3",
  "diamonds_3",
  "spades_2",
  "clubs_2",
  "hearts_2",
  "diamonds_2",
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
  constructor(playerCount=1) {
    this.playerCount = playerCount;
    this.deck = newDeck;
    this.activePlayer = 1;
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
    this.playerCount ++;
  }
  removePlayer = () => {
    this.playerCount --;
  }
  hit = () => {
    this.playerCards[this.activePlayer].push(this.deck[this.activeCard]);
    const newCard = this.playerCards[this.activePlayer][this.playerCards[this.activePlayer].length-1]
    this.activeCard ++;
    return newCard;
  }
  stick = () => {
    this.activePlayer ++;
  }
}
const rooms = {};

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
      io.to(roomName).emit("card", {'dealer': [rooms.roomName.playerCards[0][0]]})
      io.to(roomName).emit("card", {'player1': rooms.roomName.playerCards[1]})
      console.log(`Added ${socket.id} to ${roomName}`);
      console.log(io.sockets.adapter.rooms.get(roomName).size);
    } else if (io.sockets.adapter.rooms.get(roomName).size < 3) {
      socket.join(roomName);
      rooms.roomName.addPlayer();
      io.to(roomName).emit("addedId", roomName);
      console.log(`PLAYER COUNT: ${rooms.roomName.playerCount}`);
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
      io.to(roomName).emit("card", {'dealer': [rooms.roomName.playerCards[0][0]]})
      io.to(roomName).emit("card", {'player1': rooms.roomName.playerCards[1]})
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
      const newCard = {};
      newCard[`Player${rooms.roomName.activePlayer}`] = rooms.roomName.hit();
      console.log(`NEW CARD FROM HIT: ${newCard}`);
      io.emit("card", newCard);
    } else if (move === "stick") {
      rooms.roomName.activePlayer ++;
      io.emit("player", JSON.stringify({activePlayer: rooms.roomName.activePlayer}));
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
