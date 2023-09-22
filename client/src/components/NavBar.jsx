import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();

    const signoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken(null);
        navigate("/")
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">Blackjack Mifflin</Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    {token ? null : <li> <Link className='Nav' to='/Login'>Log In</Link></li>}
                    {!token ? null : <li>  <Link className='Nav' to='/Profile'>Profile</Link></li>}
                    {!token ? null : <li> <Link className='Nav' to='/Game'>Game</Link> </li>}
                    {!token ? null : <li><Link onClick={signoutHandler}> Sign Out </Link></li>}

                </ul>
            </nav>

        </>
    );
};

export default Navbar;