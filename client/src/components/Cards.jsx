// const Cards = () => {
//   const playerIds = [1, 2];
//   class PlayerHand {
//     construct() {
//       this.username
//       this.cards
//     }
//   }

//   return (
//     <>
//       <h1>Cards</h1>
//       <div id="dealer">

//       </div>
//     </>
//   )
// }

// export default Cards;

import React, { useState } from 'react';

const Cards = () => {
  const [playerHand, setPlayerHand] = useState([]);

  const addCardToHand = (card) => {
    setPlayerHand([...playerHand, card]);
  };

  return (
    <>
      <h1>Player's Hand</h1>
      <div id="dealer">
        <div className="player-hand">
          {playerHand.map((card, index) => (
            <Card key={index} cardImage={card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
