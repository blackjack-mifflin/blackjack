import React from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  const exitGame = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Multiplayer Game</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://i0.wp.com/mediachomp.com/wp-content/uploads/2022/02/the-office-cartoon-characters-15.jpg?resize=500%2C707&ssl=1"
          alt="The Office Cartoon Characters"
          style={{ maxWidth: "100%", marginTop: "20px" }}
        />
        <button onClick={exitGame}>Last Hand</button>
      </div>
    </div>
  );
};

export default Games;