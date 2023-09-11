import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>Welcome to Blackjack Mifflin</h1>
            <p>Get ready for the fun!</p>
            <Link to="/login">
                <button>Log In</button>
            </Link>
        </div>
    );
};

export default Welcome;
