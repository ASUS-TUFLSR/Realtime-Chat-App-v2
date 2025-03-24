import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomeScreen from './screen/HomeScreen'
import SignUpScreen from './screen/SignUpScreen'
import LoginScreen from './screen/LoginScreen'
import SettingScreen from './screen/SettingScreen'
import ProfileScreen from './screen/ProfileScreen'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();


  console.log({onlineUsers})
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if(isCheckingAuth && !authUser) return(
     <div className='flex items-center justify-center h-screen' >
      <Loader className="size-10 animate-spin"/>
     </div>
  );

  return (
    <div data-theme={theme} >
    <Navbar/>
    <Routes>
      <Route path='/' element={ authUser ? <HomeScreen/> : <Navigate to='/login'/>} /> 
      <Route path='/signup' element={ !authUser ? <SignUpScreen/> : <Navigate to='/'/>} /> 
      <Route path='/login' element={ !authUser ? <LoginScreen/> : <Navigate to='/'/>} /> 
      <Route path='/settings' element={<SettingScreen/>} /> 
      <Route path='/profile' element={ authUser ? <ProfileScreen/> : <Navigate to='/login'/>} /> 
    </Routes>

    <Toaster/>

    </div>
  )
}

export default App