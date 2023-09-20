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
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<LogInPage setToken={setToken} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Game" element={<Game />} />
      </Routes>
      <Messages socket={socket} />
    </>
  );
};

export default App
