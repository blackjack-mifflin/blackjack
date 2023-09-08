import './App.css'
import { Routes, Route } from "react-router-dom";
import LogIn from './components/LoginPage'
import Welcome from './components/Welcome';
import Navbar from './components/NavBar';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  )
}

export default App
