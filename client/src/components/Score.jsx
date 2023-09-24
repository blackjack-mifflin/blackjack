const Score = () => {
    
    console.log('Test Score')
    const stickWin = async () => {
        let dealerTotal = 0;
        let playerTotal = 0;
        let win = 1
        let loss = 0
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
          console.log('Tie2')
        } else if(dealerTotal > 21 && playerTotal > 21){
          console.log('tie2')
        } else if(playerTotal === 21){
          console.log('PlayerWins')
          this.playerWon(win)
        } else if (dealerTotal >= 22){
          console.log('dealer busts, player wins')
          this.playerWon(win)
        } else if( playerTotal >= 22 ){
          console.log('player busts, dealer wins')
          this.playerLoss(win)
        } else if( playerTotal <= 21 && playerTotal > dealerTotal && dealerTotal >= 17){
          console.log('Player wins2')
          this.playerWon(win)
        } else if( playerTotal < 21 && dealerTotal >= 17 && dealerTotal > playerTotal){
          console.log('Dealer Wins')
          this.playerLoss(loss)
        } else if( playerTotal < 21 && dealerTotal >= 17 && dealerTotal < playerTotal){
          console.log('Player Wins')
          this.playerWon(win)
        } else if( playerTotal < 21 && dealerTotal >= 17 && dealerTotal === playerTotal){
          console.log('Tie3')
        } else if( dealerTotal <= 21 && dealerTotal > playerTotal && dealerTotal > 17){
          console.log('Dealer wins2')
          this.playerLoss(loss)
        } else if( dealerTotal <= 21 && dealerTotal > playerTotal && dealerTotal <= 17){
          console.log('Dealer wins3')
          this.playerLoss(loss)
        } else if( dealerTotal <= 21 && dealerTotal < playerTotal && dealerTotal <= 17){
          this.stick()
        } else if( playerTotal === dealerTotal && dealerTotal > 17){
          console.log('tie4')
        }  else if( playerTotal === dealerTotal && dealerTotal < 17){
          this.stick()
        } else if(dealerTotal === 21){
          console.log('PlayerWins2')
          this.playerWon(win)
        }
      }
      return (<h1>Hello</h1>)
}
export default Score