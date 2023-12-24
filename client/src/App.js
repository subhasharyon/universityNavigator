import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


function App() {
  useEffect(()=>{
    axios.defaults.baseURL = 'http://localhost:2407'
  },[])
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/edit' element={<EditProfile/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
