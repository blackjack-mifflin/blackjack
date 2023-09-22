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

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
app.get("/profile/paymentform", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

newDeck = [
  { spades_ace: 11 },
  { clubs_ace: 11 },
  { hearts_ace: 11 },
  { diamonds_ace: 11 },
  { spades_king: 10 },
  { clubs_king: 10 },
  { hearts_king: 10 },
  { diamonds_king: 10 },
  { spades_queen: 10 },
  { clubs_queen: 10 },
  { hearts_queen: 10 },
  { diamonds_queen: 10 },
  { spades_jack: 10 },
  { clubs_jack: 10 },
  { hearts_jack: 10 },
  { diamonds_jack: 10 },
  { spades_10: 10 },
  { clubs_10: 10 },
  { hearts_10: 10 },
  { diamonds_10: 10 },
  { spades_9: 9 },
  { clubs_9: 9 },
  { hearts_9: 9 },
  { diamonds_9: 9 },
  { spades_8: 8 },
  { clubs_8: 8 },
  { hearts_8: 8 },
  { diamonds_8: 8 },
  { spades_7: 7 },
  { clubs_7: 7 },
  { hearts_7: 7 },
  { diamonds_7: 7 },
  { spades_6: 6 },
  { clubs_6: 6 },
  { hearts_6: 6 },
  { diamonds_6: 6 },
  { spades_5: 5 },
  { clubs_5: 5 },
  { hearts_5: 5 },
  { diamonds_5: 5 },
  { spades_4: 4 },
  { clubs_4: 4 },
  { hearts_4: 4 },
  { diamonds_4: 4 },
  { spades_3: 3 },
  { clubs_3: 3 },
  { hearts_3: 3 },
  { diamonds_3: 3 },
  { spades_2: 2 },
  { clubs_2: 2 },
  { hearts_2: 2 },
  { diamonds_2: 2 },
];
class Room {
  constructor(playerCount = 1) {
    this.playerCount = playerCount;
    this.deck = newDeck;
    this.activePlayer = 1;
    this.activeCard = 0;
    this.playerCards = [];
  }
  shuffle = (deck) => {
    const newCards = [];
    for (let i = 0; i < deck.length; i++) {
      const j = Math.floor(Math.random() * deck.length);
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  };
  startHand = () => {
    this.shuffle(this.deck);
    for (let i = 0; i <= this.playerCount; i++) {
      this.playerCards.push([
        this.deck[this.activeCard],
        this.deck[this.activeCard + 1],
      ]);
      this.activeCard += 2;
    }
  };
  addPlayer = () => {
    this.playerCount++;
  };
  removePlayer = () => {
    this.playerCount--;
  };
  hit = () => {
    this.playerCards[this.activePlayer].push(this.deck[this.activeCard]);
    const newCard =
      this.playerCards[this.activePlayer][
        this.playerCards[this.activePlayer].length - 1
      ];
    this.activeCard++;
    let handSum = 0;
    this.playerCards[this.activePlayer].forEach(
      (card) => (handSum += Number(Object.values(card)))
    );
    console.log(`VALUES FROM HIT: ${JSON.stringify(handSum)}`);
    if (handSum >= 21) {
      this.activePlayer++;
    } 
    return newCard;
  };
  stick = () => {
    this.activePlayer++;
    if (this.activePlayer > this.playerCount) {
      this.dealerPlay();
    }
  };
  dealerPlay = () => {
    io.emit("card", rooms.roomName.getDataWithDealer());
    let dealerSum = 0;
    this.playerCards[0].forEach(
      (card) => (dealerSum += Number(Object.values(card)))
    );
    while (dealerSum < 17) {
      this.playerCards[0].push(this.deck[this.activeCard]);
      this.activeCard++;
      io.emit("card", rooms.roomName.getDataWithDealer());
      this.playerCards[0].forEach(
        (card) => (dealerSum += Number(Object.values(card)))
      );
    }
  };
  getDataPreDealer = () => {
    const data = {
      dealer: [this.playerCards[0][0]],
      player1: this.playerCards[1],
      player2: this.playerCards[2],
      player3: this.playerCards[3],
      activePlayer: this.activePlayer,
    };
    return data;
  };
  getDataWithDealer = () => {
    const data = {
      dealer: this.playerCards[0],
      player1: this.playerCards[1],
      player2: this.playerCards[2],
      player3: this.playerCards[3],
      activePlayer: this.activePlayer,
    };
    return data;
  };
}
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
      console.log(`NEW CARD FROM HIT: ${newCard}`);
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
