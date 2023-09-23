import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import LogInPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage';
import Profile from './components/ProfilePage';
import Navbar from './components/NavBar';
import Game from './components/Game';
import { useState } from "react";
import PaymentForm from './components/PaymentForm';


const App = () => {
  const [token, setToken] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);

  return (
    <>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<Welcome />} playerInfo={playerInfo}/>
        <Route path="/Login" element={<LogInPage setToken={setToken} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Profile" element={<Profile setPlayerInfo={setPlayerInfo}/>} />
        <Route path="/Game" element={<Game />} />
        <Route path="/profile/paymentform" element={<PaymentForm />} />
      </Routes>
    </>
  );
};

export default App
