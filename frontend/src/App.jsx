import React from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import HomeScreen from './screen/HomeScreen'
import SignUpScreen from './screen/SignUpScreen'
import LoginScreen from './screen/LoginScreen'
import SettingScreen from './screen/SettingScreen'
import ProfileScreen from './screen/ProfileScreen'

const App = () => {
  return (
    <div>
      
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomeScreen/>} /> 
      <Route path='/signup' element={<SignUpScreen/>} /> 
      <Route path='/login' element={<LoginScreen/>} /> 
      <Route path='/settings' element={<SettingScreen/>} /> 
      <Route path='/profile' element={<ProfileScreen/>} /> 
    </Routes>
    </div>
  )
}

export default App