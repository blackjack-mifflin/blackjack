import { useState, useEffect } from "react";

const Cards = ({ cardData, winLossData }) => {
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [player3, setPlayer3] = useState([]);
  const [dealer, setDealer] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    setDealer(cardData.dealer);
    setPlayer1(cardData.player1);
    if (cardData.player2) {
      setPlayer2(cardData.player2);
    }
    if (cardData.player3) {
      setPlayer3(cardData.player3);
    }
    setActivePlayer(cardData.activePlayer);
  }, [cardData]);

  return (
    <>
      {dealer && <h3>Dealer</h3>}
      {dealer &&
        dealer.map((card) => {
          return (
            <>
              <img
                key={Object.keys(card)}
                src={`https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/${Object.keys(
                  card
                )}.svg`}
                alt={Object.keys(card)}
              />
            </>
          );
        })}
      {player1 && <h3>Player 1 {activePlayer === 1 && <i>active</i>}</h3>}
      <p>{winLossData.player1}</p>
      {player1 &&
        player1.map((card) => {
          return (
            <>
              <img
                key={Object.keys(card)}
                src={`https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/${Object.keys(
                  card
                )}.svg`}
                alt={Object.keys(card)}
              />
            </>
          );
        })}
      {cardData.player2 && <h3>Player 2 {activePlayer === 2 && <i>active</i>}</h3>}
      <p>{winLossData.player1}</p>
      {player2 &&
        player2.map((card) => {
          return (
            <>
              <img
                key={Object.keys(card)}
                src={`https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/${Object.keys(
                  card
                )}.svg`}
                alt={Object.keys(card)}
              />
            </>
          );
        })}
      {cardData.player3 && <h3>Player 3 {activePlayer === 3 && <i>active</i>}</h3>}
      <p>{winLossData.player1}</p>
      {player3 &&
        player3.map((card) => {
          return (
            <>
              <img
                key={Object.keys(card)}
                src={`https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/${Object.keys(
                  card
                )}.svg`}
                alt={Object.keys(card)}
              />
            </>
          );
        })}
    </>
  );
};

export default Cards;
