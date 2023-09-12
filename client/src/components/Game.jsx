import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {io} from 'socket.io-client';

const Game = () => {
  const [isLastHand, setIsLastHand] = useState(false);
  const navigate = useNavigate();
  var socket = io('/server');

  const lastHand = () => {
    console.log('move to home page');
    setIsLastHand(true);
    navigate('/');
  }

  const socketHandler = (e) => {
    console.log(e.target.value);
    const moveType = e.target.value;
    socket.emit("move", moveType);
  }

  socket.on("cards", (card) => {
    console.log(card);
  });

import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <>
      <h1>Blackjack Mifflin</h1>
      <button onClick={lastHand}>Last Hand</button>
      <button onClick={socketHandler} value="hit">Hit</button>
      <button onClick={socketHandler} value="stick">Stick</button>
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
