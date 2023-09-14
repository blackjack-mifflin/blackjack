import { useEffect, useState } from "react";

const PlayerStats = ({currentHandBet}) => {
  const [playerBalance, setPlayerBalance] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [playerLosses, setPlayerLosses] = useState(0);
  const [playerRatio, setPlayerRatio] = useState(0.0);
  const playerId = 1;
  console.log(`CURRENT HAND BET: ${currentHandBet}`);

  useEffect(() => {
    setPlayerRatio(playerWins / (playerWins + playerLosses) ? playerWins / (playerWins + playerLosses) : 0);
  }, [playerWins, playerLosses]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const response = await fetch(`/api/players/${playerId}`);
      const result = await response.json();
      console.log(result);
      setPlayerBalance(result.balance);
      setPlayerWins(result.wins);
      setPlayerLosses(result.losses);
    };
    fetchPlayerData();
  }, [currentHandBet]);

  return (
    <>
      <h3>Player Stats</h3>
      <p>Balance: {playerBalance}</p>
      <p>Win/Loss Ratio: {playerRatio}</p>
    </>
  );
};

export default PlayerStats;
