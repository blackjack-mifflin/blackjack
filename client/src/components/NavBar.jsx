import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const signoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Blackjack Mifflin</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li><Link to="/login">LogIn</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/game">Multiplayer Game</Link></li>
                <li><Link to="/" onClick={signoutHandler}>Sign Out</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;