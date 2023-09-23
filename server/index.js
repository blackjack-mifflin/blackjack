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
const Room = require("./game/room");
app.use(morgan("dev"));
app.use(require("body-parser").json());
app.use(cors());

const rooms = {};

io.on("connection", (socket) => {
  const joinRoom = (roomName, roomNum) => {
    if (!io.sockets.adapter.rooms.get(roomName)) {
      rooms.roomName = new Room(1);
      rooms.roomName.startHand();
      console.log("No Users in Room");
      console.log(`${roomName} DECK: ${rooms.roomName.deck}`);
      console.log(`${roomName} DEALER: ${rooms.roomName.playerCards[0]}`);
      console.log(`${roomName} PLAYER1: ${rooms.roomName.playerCards[1]}`);
      socket.join(roomName);
      io.to(roomName).emit("addedId", roomName);
      io.emit("card", rooms.roomName.getDataPreDealer());
      console.log(`Added ${socket.id} to ${roomName}`);
      console.log(io.sockets.adapter.rooms.get(roomName).size);
    } else if (io.sockets.adapter.rooms.get(roomName).size < 3) {
      socket.join(roomName);
      rooms.roomName.addPlayer();
      io.to(roomName).emit("addedId", roomName);
      console.log(`PLAYER COUNT: ${rooms.roomName.playerCountCurrentHand}`);
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
      io.emit("card", rooms.roomName.getDataPreDealer());
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
      console.log(`NEW CARD FROM HIT: ${JSON.stringify(newCard)}`);
      io.emit("card", rooms.roomName.getDataPreDealer());
      if (rooms.roomName.activePlayer > rooms.roomName.playerCountCurrentHand) {
        rooms.roomName.dealerPlay();
        io.emit("card", rooms.roomName.getDataWithDealer());
        rooms.roomName.startHand();
        io.emit("player", 'NEW GAME!!') //DELETE
        io.emit("card", rooms.roomName.getDataPreDealer());
      }
    } else if (move === "stick") {
      rooms.roomName.activePlayer++;
      io.emit("card", rooms.roomName.getDataPreDealer());
      if (rooms.roomName.activePlayer > rooms.roomName.playerCountCurrentHand) {
        rooms.roomName.dealerPlay();
        io.emit("card", rooms.roomName.getDataWithDealer());
        rooms.roomName.startHand();
        io.emit("player", 'NEW GAME!!') //DELETE
        io.emit("card", rooms.roomName.getDataPreDealer());
      }
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

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
app.get("/profile/paymentform", (req, res) => {
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