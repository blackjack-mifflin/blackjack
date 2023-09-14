import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import LogInPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage';
import Profile from './components/ProfilePage';
import Navbar from './components/NavBar';
import Game from './components/Game';
import { useState } from "react";
import { io } from 'socket.io-client';
import Messages from './components/Messages'; // Import the Messages component


const App = () => {
  const [token, setToken] = useState(null);

  const socket = io('/');

  return (
    <>
      <h1>Hello World</h1>
      <Navbar />
      <Routes>
        <Route token={token} setToken={setToken} path="/login" element={<LogInPage />} />
        <Route path="/" element={<Welcome socket={socket} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<Welcome socket={socket} />} /> {/* Pass the socket to Welcome */}
      </Routes>
      <Messages socket={socket} /> {/* Pass the socket to Messages */}
    </>
  );
};

export default App
