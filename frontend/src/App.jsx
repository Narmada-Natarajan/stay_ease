import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Wishlist from '../pages/Wishlist'
import Protectedroute from '../context/Protectedroute'
import Propertydetails from '../pages/Propertydetails'

function App() {


  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route element={<Protectedroute/>}>
      <Route path="/" element={<Home/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/property/:id" element={<Propertydetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
