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
  const id = localStorage.getItem('userId');


  const lastHand = () => {
    console.log("move to home page");
    setIsLastHand(true);
    navigate("/");
  };

  const socketHandler = (e) => {
    const message = e.target.value;
    console.log(`MOVE FROM CLIENT: ${message}`);
    socket.emit("move", message);
    socket.emit("checkScore")
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
    if(card.player1){
      console.log(`Players # of Cards: ${JSON.stringify(card.player1.length)}`);
    }

    console.log(`CARD FROM SERVER: ${JSON.stringify(card)}`);
  });

  socket.on("win", (score) => {
    console.log(score)

    const addHandler = async () => {
      const response = await fetch(`/api/players/add/wins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wins: 0 + 1 }),
      });
      const result = await response.json();
      console.log(result);
    };
    addHandler()
  });

 socket.on("loss", (score) => {
    console.log(score)

    const addHandler = async () => {
      const response = await fetch(`/api/players/add/loss/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ losses: 0 + 1 }),
      });
      const result = await response.json();
      console.log(result);
    };
    addHandler()
  });


  socket.on("player", (playerIdx) => {
    console.log(`Current player at seat ${playerIdx}`);
  });


  useEffect(() => {
    socket.on("new message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("new message");
    };
  }, [socket]);

  return (
    <>
      <h1>Blackjack Mifflin</h1>
      <PlayerStats currentHandBet={currentHandBet} />
      <button onClick={joinGame}>Join Game</button>
      <button onClick={lastHand}>Last Hand</button>

      <button onClick={socketHandler} value="hit">
        Hit
      </button>

      <button onClick={socketHandler} value="stick">
        Stick
      </button>
      <Cards cardData={cardData} />

      <Bet
        currentHandBet={currentHandBet}
        setCurrentHandBet={setCurrentHandBet}
        betSize={betSize}
        setBetSize={setBetSize}
      />
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://i0.wp.com/mediachomp.com/wp-content/uploads/2022/02/the-office-cartoon-characters-15.jpg?resize=500%2C707&ssl=1"
          alt="The Office Cartoon Characters"
          style={{ maxWidth: "17%", marginTop: "-220px" }}
        />
      </div>

      <div className="message-window">


        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="name-input"
        />
        <div className="message-list">

        </div>
        <div className="message-form">
          <input
            type="text"
            placeholder="Your Message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="message-input"
          />
          <button onClick={sendMessage} className="message-button">
            Send
          </button>
        </div>
      </div >
      <Messages />
    </>
  );
};

export default Game;