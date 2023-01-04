import React, { useContext } from 'react';

import {Navigate,Outlet, redirect} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import Home from '../Pages/Home';

const useAuth=()=>{
  const user=localStorage.getItem('authTokens')
  console.log(user);
  if(user){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=({children}) =>{
  useAuth()

  const {user}=useContext(AuthContext)

  return user?(<Home/>):(<Navigate to='/login'/>)
}

export default ProtectedRoutes;