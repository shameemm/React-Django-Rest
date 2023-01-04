import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext'
import './Login.css'
import { Navigate, redirect, useNavigate,Link } from 'react-router-dom';


function Login() {
  const navigate=useNavigate()
  const {loginUser} = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const data = {
    username: username,
    password: password,
  }
  const userLogin = async (e) => {
    e.preventDefault();
    console.log(data);
    await axios.post('http://localhost:8000/api/users/login', data,).then((response) => {
      if(response.data==="User not found" || response.data==="Password is incorrect"){
        alert(response.data)
      }else{
        console.log("====",response.data);
        localStorage.setItem("user",response.data)
        // loginUser(response.data)
        navigate('/profile')
      }
      
    }).catch((error) => {
      console.log(error);
      alert(error.response.data.message);
    })
  }
  return (
    <div>
      <div className='card'>
        <h2>Login</h2>
        <form  >
          <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username" />
          <br/>
          <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Enter Password" />
          <br/>
          {/* <input type="submit" value="Login" /> */}
          <button onClick={userLogin}>Login</button>
          <br />
          <Link to='/register'>Register</Link>
        </form>
      </div>
      
    </div>
  )
}

export default Login