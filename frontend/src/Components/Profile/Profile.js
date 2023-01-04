import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import './Profile.css'

function Profile() {
    const user = localStorage.getItem('user')
    const [data,setData]=useState([])
    useEffect(()=>{
        console.log('user',user);
        axios.get(`http://localhost:8000/api/user/${user}/ `).then((response)=>{
            console.log("data:",response.data)
            setData(response.data)
        })
    },[user])
    const image = String(data.image)
    console.log(data);
  return (
    <div>
        <div className="profilecard">
            <div className="profilecard__header">
                <h1>Profile</h1>
            </div>
            <div className="profilecard__body">
                <div className="profilecard__body__left">
                    <img src={`http://localhost:8000/api/${image.slice(22, )}`} alt="Loading" />
                </div>
                <div className="profilecard__body__right">
                    <h2>{data.name}</h2>
                    <h4>{data.email}</h4>
                    <h4>{data.phone}</h4>
                    <h4>@{data.username}</h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
