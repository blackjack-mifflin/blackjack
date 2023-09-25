import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import PlayerStats from "./PlayerStats";
import Bet from "./Bet";
import Messages from "./Messages";
import Cards from "./Cards";

const Game = () => {
  const [isLastHand, setIsLastHand] = useState(false);
  const navigate = useNavigate();
  const socket = io("/");
  const [betSize, setBetSize] = useState(0);
  const [currentHandBet, setCurrentHandBet] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [cardData, setCardData] = useState({});
  const [winLossData, setWinLossData] = useState({});
  const id = localStorage.getItem('userId');
  const [playerSeat, setPlayerSeat] = useState(0);

  const lastHand = () => {
    console.log("move to home page");
    setIsLastHand(true);
    navigate("/");
  };

  const socketHandler = (e) => {
    const message = e.target.value;
    console.log(`MOVE FROM CLIENT: ${message}`);
    socket.emit("move", message);
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== "" && userName.trim() !== "") {
      socket.emit("message", { name: userName, message: inputMessage });
    }
  };

  const joinGame = () => {
    console.log(`Adding User To Room (Frontend Message)`);
    socket.emit("join");
    socket.on("addedId", async (socketId) => {
      console.log(`User added to Room ID: ${socketId} (From Backend)`);
    });
  };

  socket.on("card", (card) => {
    setCardData(card);
    console.log(`Dealers Cards: ${JSON.stringify(card.dealer)}`);
    if (card.player1) {
      console.log(`Players # of Cards: ${JSON.stringify(card.player1.length)}`);
    }

    console.log(`CARD FROM SERVER: ${JSON.stringify(card)}`);
  });


  const addWin = async () => {
    const response = await fetch(`/api/players/add/wins/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wins: 0 + 1 }),
    });
    const result = await response.json();
    console.log(result);
  };



  const addLoss = async () => {
    const response = await fetch(`/api/players/add/losses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ losses: 0 + 1 }),
    });
    const result = await response.json();
    console.log(result);
  };


  socket.on("player", (playerIdx) => {
    console.log(`Current player at seat ${playerIdx}`);
    setPlayerSeat(playerIdx);
  });

  socket.on("playerScore", (score) => {
    console.log(`CURRENT SCORE OF PLAYER ${score}`);
  });

  useEffect(() => {
    const callAPI = () => {
      console.log(`USE: ${JSON.stringify(winLossData)}`)
      console.log(Object.values(winLossData))
      if (Object.values(winLossData)[playerSeat - 1] === "loss") {
        addLoss()
      } else if (Object.values(winLossData)[playerSeat - 1] === "win") {
        addWin()
      }
    }
    callAPI()
  }, [winLossData]);


  socket.on("result", (data) => {
    setWinLossData(data);
    console.log(`RESULT WITH: ${JSON.stringify(data)}`)
  })

  useEffect(() => {
    socket.on("new message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("new message");
    };
  }, [socket]);

  const backgroundStyle = {
    backgroundImage: `url('https://t4.ftcdn.net/jpg/03/20/86/93/240_F_320869363_2xgd64uUdIrJ9hAJqaHzGCZeK6qgSVdL.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
    overflowY: "auto",
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  return (
    <div className="welcome-container" style={backgroundStyle}>
      <h1 style={titleStyle}>Blackjack Mifflin</h1>
      <PlayerStats currentHandBet={currentHandBet} />
      <button style={buttonStyle} onClick={joinGame}>
        Join Game
      </button>
      <button style={buttonStyle} onClick={lastHand}>
        Last Hand
      </button>

      <button
        style={buttonStyle}
        onClick={socketHandler}
        value="hit"
      >
        Hit
      </button>

      <button
        style={buttonStyle}
        onClick={socketHandler}
        value="stick"
      >
        Stick
      </button>
      <Cards cardData={cardData} winLossData={winLossData} />

      <Bet
        currentHandBet={currentHandBet}
        setCurrentHandBet={setCurrentHandBet}
        betSize={betSize}
        setBetSize={setBetSize}
      />

      <div className="message-window">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={inputStyle}
        />
        <div className="message-list"></div>
        <div className="message-form">
          <input
            type="text"
            placeholder="Your Message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={inputStyle}
          />
          <button
            style={buttonStyle}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <Messages />
    </div>
  );
};

export default Game;
