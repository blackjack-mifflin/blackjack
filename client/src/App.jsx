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
import Messages from './components/Messages';


const App = () => {
  const [token, setToken] = useState(null);

  const socket = io('/');

  return (
    <>
      <Navbar />
      <Routes>
        <Route token={token} setToken={setToken} path="/login" element={<LogInPage />} />
        <Route path="/" element={<Welcome socket={socket} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<Welcome socket={socket} />} />
      </Routes>
      <Messages socket={socket} />
    </>
  );
};

export default App
