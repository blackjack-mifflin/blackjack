const io = require('socket.io-client');
const socket = io('/');

const newDeck = [
  { spades_ace: 11 },
  { clubs_ace: 11 },
  { hearts_ace: 11 },
  { diamonds_ace: 11 },
  { spades_king: 10 },
  { clubs_king: 10 },
  { hearts_king: 10 },
  { diamonds_king: 10 },
  { spades_queen: 10 },
  { clubs_queen: 10 },
  { hearts_queen: 10 },
  { diamonds_queen: 10 },
  { spades_jack: 10 },
  { clubs_jack: 10 },
  { hearts_jack: 10 },
  { diamonds_jack: 10 },
  { spades_10: 10 },
  { clubs_10: 10 },
  { hearts_10: 10 },
  { diamonds_10: 10 },
  { spades_9: 9 },
  { clubs_9: 9 },
  { hearts_9: 9 },
  { diamonds_9: 9 },
  { spades_8: 8 },
  { clubs_8: 8 },
  { hearts_8: 8 },
  { diamonds_8: 8 },
  { spades_7: 7 },
  { clubs_7: 7 },
  { hearts_7: 7 },
  { diamonds_7: 7 },
  { spades_6: 6 },
  { clubs_6: 6 },
  { hearts_6: 6 },
  { diamonds_6: 6 },
  { spades_5: 5 },
  { clubs_5: 5 },
  { hearts_5: 5 },
  { diamonds_5: 5 },
  { spades_4: 4 },
  { clubs_4: 4 },
  { hearts_4: 4 },
  { diamonds_4: 4 },
  { spades_3: 3 },
  { clubs_3: 3 },
  { hearts_3: 3 },
  { diamonds_3: 3 },
  { spades_2: 2 },
  { clubs_2: 2 },
  { hearts_2: 2 },
  { diamonds_2: 2 },
];

class Room {
  constructor(playerCount = 1) {
    this.playerCountCurrentHand = playerCount;
    this.playerCountNextHand = this.playerCountCurrentHand
    this.deck = newDeck;
    this.activePlayer = 1;
    this.activeCard = 0;
    this.playerCards = [];
  }
  shuffle = (deck) => {
    const newCards = [];
    for (let i = 0; i < deck.length; i++) {
      const j = Math.floor(Math.random() * deck.length);
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  };
  startHand = () => {
    this.activePlayer = 1;
    this.activeCard = 0;
    this.shuffle(this.deck);
    this.playerCards = [];
    this.playerCountCurrentHand = this.playerCountNextHand
    for (let i = 0; i <= this.playerCountCurrentHand; i++) {
      this.playerCards.push([
        this.deck[this.activeCard],
        this.deck[this.activeCard + 1],
      ]);
      this.activeCard += 2;
    }
  };
  addPlayer = () => {
    this.playerCountNextHand++;
  };
  removePlayer = () => {
    this.playerCountNextHand--;
  };
  hit = () => {
    let dealerTotal = 0;
    let playerTotal = 0;
    this.playerCards[this.activePlayer].push(this.deck[this.activeCard]);
    const newCard =
      this.playerCards[this.activePlayer][
        this.playerCards[this.activePlayer].length - 1
      ];
    this.activeCard++;
    let handSum = 0;
    this.playerCards[this.activePlayer].forEach(
      (card) => (handSum += Number(Object.values(card)))
    );
    console.log(`PLAYER VALUES FROM HIT: ${JSON.stringify(handSum)}`);
    if(handSum >= 21){
      this.stick();
      
    console.log(`Dealers Cards: ${Object.values(this.playerCards[0])}`)
    console.log(`Players Cards: ${Object.values(this.playerCards[1])}`)
    let dealer = Object.values(this.playerCards[0])
    let player = Object.values(this.playerCards[1])
    
    for(let i = 0; i < dealer.length; i++){
      dealerTotal += Number(Object.values(dealer[i]))
    }
    for(let i = 0; i < player.length; i++){
      playerTotal += Number(Object.values(player[i]))
    }
    console.log(dealerTotal)
    console.log(playerTotal)
    console.log(this.playerCards)
    if(dealerTotal === 21 && playerTotal === 21 || dealerTotal >= 22 && playerTotal >= 22){
      console.log('Tie')
    } else if(dealerTotal <= 21 && playerTotal <= 21){
      console.log('Hit or Stay?')
    } else if (dealerTotal >= 22 && playerTotal <= 21){
      console.log('dealer busts')
    
      const playerWin = async (event) => {
        event.preventDefault();
        const response = await fetch(`/bet/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: 0 + playerTotal }),
        });
        const result = await response.json();
        console.log(result);
      };
  
    } else if( playerTotal >= 22 && dealerTotal <= 21){
      console.log('player busts')
    }
    return newCard;
  }};
  
  stick = () => {
    this.activePlayer++;
    if (this.activePlayer > this.playerCountCurrentHand) {
      this.dealerPlay();
    }
  };
  dealerPlay = () => {
    let dealerTotal = 0;
    let playerTotal = 0;
    let dealerSum = 0;
    this.playerCards[0].forEach(
      (card) => (dealerSum += Number(Object.values(card)))
    );
    while (dealerSum < 17) {
      this.playerCards[0].push(this.deck[this.activeCard]);
      this.activeCard++;
      this.playerCards[0].forEach(
        (card) => (dealerSum += Number(Object.values(card)))
      );
      console.log(`DEALER VALUES FROM HIT: ${JSON.stringify(dealerSum)}`);
    }
    console.log(`Dealers Cards: ${Object.values(this.playerCards[0])}`)
    console.log(`Players Cards: ${Object.values(this.playerCards[1])}`)
    console.log()
    let dealer = Object.values(this.playerCards[0])
    let player = Object.values(this.playerCards[1])
    
    for(let i = 0; i < dealer.length; i++){
      dealerTotal += Number(Object.values(dealer[i]))
    }
    for(let i = 0; i < player.length; i++){
      playerTotal += Number(Object.values(player[i]))
    }
    console.log(dealerTotal)
    console.log(playerTotal)
    if(dealerTotal === 21 && playerTotal === 21){
      console.log('Tie')
    } else if(dealerTotal <= 21 && playerTotal <= 21){
      console.log('Another hit?')
    } else if (dealerTotal > 22){
      console.log('dealer busts')
    } else if( playerTotal > 22 ){
      console.log('player busts')
    }
  };
  getDataPreDealer = () => {
    const data = {
      dealer: [this.playerCards[0][0]],
      player1: this.playerCards[1],
      player2: this.playerCards[2],
      player3: this.playerCards[3],
      activePlayer: this.activePlayer,
    };
    return data;
  };
  getDataWithDealer = () => {
    const data = {
      dealer: this.playerCards[0],
      player1: this.playerCards[1],
      player2: this.playerCards[2],
      player3: this.playerCards[3],
      activePlayer: this.activePlayer,
    };
    return data;
  };

  gameWinner =async () => {
  
}
}
module.exports = Room;