import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <>
      <h1>Blackjack Mifflin</h1>
    </>
  );
};

const multiplayer = () => {

  const exitGame = () => {
  };

  return (
    <div>
      <h1>Multiplayer Game</h1>
      <div>

        <button onClick={exitGame}>Last Hand</button>
      </div>
    </div>
  );
};

export default Games;
