import './App.css';
import { useContext } from 'react';
import {Routes, Route, useNavigate, redirect, Navigate} from 'react-router-dom'
import Head from './Components/Head/Head';
import Home from './Pages/Home'
import LoginPage from './Pages/Login'
import Logout from './Components/Logout/Logout'
import Register from './Components/Register/Register'
import ProfilePage from './Pages/Profile'
import AdminLoginPage from './Pages/adminLoginPage'
import AdminHomePage from './Pages/AdminHomePage'

import {AdminContext, AdminProvider} from './Context/AdminContext';
import {AuthContext, AuthProvider} from './Context/AuthContext';
import ProtectedRoutes from './utils/PrivateRoute';
import { EditProvider } from './Context/EditContext';
import Edit from './Pages/Edit';
function App() {
  // const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  return (
    <div className='App'>
      <AdminProvider>
      <AuthProvider>
      <EditProvider>
      
       
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>} exact/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/register' element={ user?<Navigate to={"/"}/>:<Register/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
        <Route path='/profile' element={user?<ProfilePage/>:<Navigate to={"/login"}/>}/>
        <Route path='/admin' element={<AdminLoginPage/>}/>
        <Route path='/admin-home' element={user?<AdminHomePage/>:<Navigate to={"/admin"}/>}/>
        <Route path='/edit' element={user? <Edit/> :<Navigate to={"/login"}/>}/>
        
      </Routes>
      </EditProvider>
      </AuthProvider>
      </AdminProvider>
      
    </div>
  );
}

export default App;
