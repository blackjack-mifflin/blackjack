import { Link } from 'react-router-dom';

const Navbar = () => {

    const signoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">LogIn</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/game">Multiplayer Game</Link></li>
                <li><Link to="/" onClick={signoutHandler}>Sign Out</Link></li>

                {/* Here I can put more navigation buttons - LATER ON!! */}
            </ul>
        </nav>
    );
};

export default Navbar;