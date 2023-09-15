import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import PlayerStats from "./PlayerStats";
import Bet from "./Bet";

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


  const joinGame = (arg) => {
    socket.on('create', () => {
      console.log(`Create Room ${arg}`);
    });
  };

  socket.on('card', (card) => {
    console.log(`CARD FROM SERVER: ${card}`);
  });
  socket.on("player", (playerIdx) => {
    console.log(`Current player at seat ${playerIdx}`);
  });

  return (
    <>
      <h1>Blackjack Mifflin</h1>
      <PlayerStats currentHandBet={currentHandBet} />
      <button onClick={joinGame}>Join A Game</button>
        <br/>
      <button onClick={lastHand}>Last Hand</button>

      <button onClick={socketHandler} value="hit">
        Hit
      </button>

      <button onClick={socketHandler} value="stick">
        Stick
      </button>
      <Bet currentHandBet={currentHandBet} setCurrentHandBet={setCurrentHandBet} betSize={betSize} setBetSize={setBetSize} />
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
