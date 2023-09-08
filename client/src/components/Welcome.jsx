import React from "react";
const Welcome = () => {


    const navigateToProfile = () => {
        // Handle navigation to the profile page when it is ready(soon)
        console.log("Navigate to the profile page");
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Blackjack Mifflin</h1>
            <p>Get ready for the fun!</p>
            <button onClick={navigateToProfile}>Profile Page</button>
        </div>
    );
};

export default Welcome;
