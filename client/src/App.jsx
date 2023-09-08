import './App.css'
import { Routes, Route } from "react-router-dom";
import LogIn from './components/LoginPage'
import Welcome from './components/Welcome';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  )
}

export default App
