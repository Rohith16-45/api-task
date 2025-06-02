import React from 'react';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './login';
import Register from './register';
import EmailVerification from './verifymail';
import Dashboard from './dashboard';
import './App.css';


function App() {
 

  return (
    <>
  <BrowserRouter>
  <Routes>
    
    <Route path='/' element={<Register/>}/>
    <Route path='/verifymail' element={<EmailVerification/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
