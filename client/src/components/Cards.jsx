import React, { useState, useEffect } from 'react';

const Cards = ({ cardData }) => {
  const [player1, setplayer1] = useState([]);
  const [player2, setplayer2] = useState([]);
  const [player3, setplayer3] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [activePlayer, setactivePlayer] = useState(1);

  useEffect(() => {
    setDealer(cardData.dealer);
    console.log(`DEALER DATA FROM CARDS.JS: ${dealer}`);
  }, [cardData]);




  console.log(`CARD DATA FROM CARDS.JSX: ${dealer}`);

  return (
    <>
      <h1>Player's Hand</h1>
      <p> {JSON.stringify(dealer)} </p>
    </>
  );
};

export default Cards;
