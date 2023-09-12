import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Game = () => {
  const [isLastHand, setIsLastHand] = useState(false);
  const navigate = useNavigate();
  const socket = io('http://localhost:3000');

  const lastHand = () => {
    console.log("move to home page");
    setIsLastHand(true);
    navigate("/");
  };

  const socketHandler = (e) => {
    const message = e.target.value;
    console.log(`MESSAGE FROM CLIENT: ${message}`);
    socket.emit('message', message);
  };

  socket.on('new message', (msg) => {
    console.log(`MESSAGE FROM SERVER: ${msg}`);
  });

  return (
    <>
      <h1>Blackjack Mifflin</h1>

      <button onClick={lastHand}>Last Hand</button>
      <button onClick={socketHandler} value="hit">
        Hit
      </button>
      <button onClick={socketHandler} value="stick">
        Stick
      </button>
    </>
  );
};

export default Game;
