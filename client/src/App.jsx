import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import LogInPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage'
import Navbar from './components/NavBar';
import Games from './components/Game';
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>

      <Navbar />
      <Routes>
        <Route
          token={token}
          setToken={setToken}
          path="/login"
          element={<LogInPage />}
        />
        <Route path="/multiplayer" element={<Games />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/SignUp" element={<SignUpPage />}></Route>
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </>
  )
}

export default App
