import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Add from './components/Add'
import Login from './components/Login'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'

function App() {

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route element={<PrivateRoutes/>}>
         <Route path='/add' element={<Add/>}></Route>
      </Route>
     

     </Routes>
     
    </>
  )
}

export default App
