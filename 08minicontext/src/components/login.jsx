import React from 'react'
import { useState,useContext } from "react"
import userContext from "../context/usercontext"

function Login() {
    const [username,setUsername]=useState("")
    const [password,setPasword]=useState("")

    const {setUser}=useContext(userContext)



 const   handleSubmit= (e)=>{
    e.preventDeafult()
    setUser({username,password})

    }

    return (
        <>
        <h2>Login</h2>
        <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="text" placeholder="password" value={password} onChange={(e)=>setPasword(e.target.value)} style={{marginLeft: 16 }}/>
        <button onClick={handleSubmit} style={{marginLeft:16 , backgroundColor:"gray"}}>Submit</button>
        </>
    )
}

export default Login

