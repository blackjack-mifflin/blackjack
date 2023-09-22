import React, { useState, useEffect } from 'react';

const Cards = ({ cardData }) => {
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [player3, setPlayer3] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    setDealer(cardData.dealer);
    console.log(`DEALER DATA FROM CARDS.JS: ${JSON.stringify(dealer)}`);
  }, [cardData]);

  useEffect(() => {
    setPlayer1(cardData.player1);
    console.log(`PLAYER1 DATA FROM CARDS.JS: ${JSON.stringify(player1)}`);
  }, [cardData]);

  useEffect(() => {
    if (cardData.player2) {
      setPlayer2(cardData.player2);
      console.log(`PLAYER2 DATA FROM CARDS.JS: ${JSON.stringify(player2)}`);
    }
  }, [cardData]);

  useEffect(() => {
    if (cardData.player3) {
      setPlayer3(cardData.player3);
      console.log(`PLAYER3 DATA FROM CARDS.JS: ${JSON.stringify(player3)}`);
    }
  }, [cardData]);

  console.log(`CARD DATA FROM CARDS.JSX: ${JSON.stringify(dealer)}`);

  return (
    <>
      <h1>Dealer's Hand</h1>
      <p> {JSON.stringify(dealer)} </p>
      <h1>Player 1 Hand</h1>
      <p> {JSON.stringify(player1)} </p>
      {cardData.player2 && (
        <>
          <h1>Player 2's Hand</h1>
          <p> {JSON.stringify(player2)} </p>
        </>
      )}
      {cardData.player3 && (
        <>
          <h1>Player 3's Hand</h1>
          <p> {JSON.stringify(player3)} </p>
        </>
      )}
    </>
  );
};

export default Cards;
