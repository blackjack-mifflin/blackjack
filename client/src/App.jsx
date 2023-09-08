import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import LogInPage from './components/LoginPage'
import {Link} from 'react-router-dom'
import SignUpPage from './components/SignUpPage';


const App = () => {

  return (
    <>
     <Link className='Nav' to='/Login'>Log In</Link>
     <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/SignUp" element={<SignUpPage />}></Route>
    </Routes>

    </>
  )
}

export default App
