import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Head from '../Components/Head/Head'
import Profile from '../Components/Profile/Profile'
import { AuthContext } from '../Context/AuthContext'

function ProfilePage() {
  const navigate=useNavigate()
  function logoutUser(){
    console.log("aaa");
    localStorage.removeItem('user')
    navigate('/login')
  }
  
  return (
    <div>
      <button onClick={logoutUser}>Logout</button>
      <Profile/>
    </div>
    
  )
}

export default ProfilePage