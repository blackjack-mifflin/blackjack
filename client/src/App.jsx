import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import LogInPage from './components/LoginPage'
import { Link } from 'react-router-dom'
import SignUpPage from './components/SignUpPage';


import Navbar from './components/NavBar';

const App = () => {

  return (
    <>
      <Link className='Nav' to='/Login'>Log In</Link>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
      </Routes>

    </>
  )
}

export default App
