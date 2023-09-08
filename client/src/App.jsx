import './App.css'
import { Routes, Route } from "react-router-dom";
import LogIn from './components/LoginPage'

const App = () => {

  return (
    <>
     <h1>Hello World</h1>

     <Routes>
        <Route path="/login" element={<LogIn />}></Route>
    </Routes>
    </>
  )
}

export default App
