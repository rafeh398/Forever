import React from 'react'
import { useDispatch } from "react-redux"
import { authservice } from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }             //logout b promise ha apne ap mein jitny b reducers hain to then lga do
    return (
        <div>
            <button className=" inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}> Logout</button>
        </div>
    )
}

export default LogoutBtn
