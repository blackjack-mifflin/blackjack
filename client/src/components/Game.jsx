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
}

export default Game;
