import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import PlayerStats from "./PlayerStats";

const Game = () => {
  const [isLastHand, setIsLastHand] = useState(false);
  const navigate = useNavigate();
  const socket = io("http://localhost:3000");
  const [betSize, setBetSize] = useState(0);
  const [currentHandBet, setCurrentHandBet] = useState(0);

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

  socket.on("card", (card) => {
    console.log(`CARD FROM SERVER: ${card}`);
  });
  socket.on("player", (playerIdx) => {
    console.log(`Current player at seat ${playerIdx}`);
  });

  const betHandler = async (e) => {
    e.preventDefault();
    setCurrentHandBet(betSize);
    const id = 1;
    const response = await fetch(`/api/players/bet/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: 0 - betSize }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <h1>Blackjack Mifflin</h1>
      <PlayerStats currentHandBet={currentHandBet} />

      <button onClick={lastHand}>Last Hand</button>

      <button onClick={socketHandler} value="hit">
        Hit
      </button>

      <button onClick={socketHandler} value="stick">
        Stick
      </button>
      <h3>Bet Size: {currentHandBet}</h3>
      <form onSubmit={betHandler}>
        <input
          type="number"
          min="0"
          onChange={(e) => setBetSize(e.target.value)}
        />
        <button>Bet</button>
      </form>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://i0.wp.com/mediachomp.com/wp-content/uploads/2022/02/the-office-cartoon-characters-15.jpg?resize=500%2C707&ssl=1"
          alt="The Office Cartoon Characters"
          style={{ maxWidth: "100%", marginTop: "20px" }}
        />
      </div>
    </>
  );
};

export default Game;
