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

// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const Cards = () => {
//   const [playerHand, setPlayerHand] = useState([]);
//   const [dealerHand, setDealerHand] = useState([]);

//   useEffect(() => {
//     const socket = io('/'); // Replace with your socket.io connection details
//     console.log(`Socket connected`, socket.connected);
//     // Listen for incoming card data from the server
//     socket.on('card', (data) => {
//       // Assuming data is in the format: { playerName: ["card1", "card2"] }

//       const { playerName, cards } = data;

//       // Update the player's or dealer's hand with the received cards
//       if (playerName === 'player1') {
//         setPlayerHand((prevHand) => [...prevHand, ...cards]);
//       } else if (playerName === 'dealer') {
//         setDealerHand((prevHand) => [...prevHand, ...cards]);
//       }
//     });

//     // Clean up the socket listener when the component unmounts
//     return () => {
//       socket.off('card');
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <h1>Player's Hand</h1>
//       <div id="dealer">
//         <div className="player-hand">
//           {playerHand.map((card, index) => (
//             <img key={index} src={`images/${card}.png`} alt={`Player Card ${index}`} />
//           ))}
//         </div>
//         <div className="dealer-hand">
//           {dealerHand.map((card, index) => (
//             <img key={index} src={`images/${card}.png`} alt={`Dealer Card ${index}`} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cards;


import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Cards = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  useEffect(() => {
    const socket = io('/');

    socket.on('card', (data) => {
      const { playerName, cards } = data;

      if (playerName === 'player1') {
        setPlayerHand((prevHand) => [...prevHand, ...cards]);
      } else if (playerName === 'dealer') {
        setDealerHand((prevHand) => [...prevHand, ...cards]);
      }
    });

    return () => {
      socket.off('card');
      socket.disconnect();
    };
  }, []);

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