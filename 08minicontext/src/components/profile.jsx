import React from 'react'
import userContext from "../context/usercontext"
import { useContext } from "react"

function Profile() {

const {user}= useContext(userContext)
 if (!user) return <div>Please Login</div>
  return <div>
    welcome {user.username}
  </div>

}


export default Profile

// user,username = user se username le liya