import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


const Cards = ({ cardData }) => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  // useEffect(() => {
  //   const socket = io('/');
  //   console.log(`Socket connected`, socket.connected);

  //   socket.on('card', (data) => {
  //     const { playerName, cards } = data;

  //     if (playerName === 'player1') {
  //       setPlayerHand((prevHand) => [...prevHand, ...cards]);
  //     } else if (playerName === 'dealer') {
  //       setDealerHand((prevHand) => [...prevHand, ...cards]);
  //     }
  //   });
  // }, []);

  console.log(`CARD DATA FROM CARDS.JSX: ${JSON.stringify(cardData.dealer)}`);

  return (
    <>
      <h1>Player's Hand</h1>
      <div id="dealer">
        <div className="player-hand">
          {playerHand.map((card, index) => (
            <img key={index} src={`images/${card}.png`} alt={`Player Card ${index}`} />
          ))}
        </div>
        <div className="dealer-hand">
          {dealerHand.map((card, index) => (
            <img key={index} src={`images/${card}.png`} alt={`Dealer Card ${index}`} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
