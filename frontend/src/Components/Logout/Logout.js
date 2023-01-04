import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const access = localStorage.access
    const navigate = useNavigate()
    // localStorage.removeItem(access,localStorage.refresh,localStorage.user)
    window.localStorage.clear();
    console.log(localStorage);
    useEffect(()=>{
        navigate('/')
    })
}

export default Logout