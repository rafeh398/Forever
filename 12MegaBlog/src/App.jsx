
import React, { useEffect, useState } from "react"
import './App.css'
import { useDispatch } from "react-redux"
import { authservice } from "./appwrite/auth"  //object jo class se bnaya tha ab is k through access krege class k method

import { login, logout } from "./store/authSlice"
import { Footer } from "./components"
import { Header } from "./components" 
import { Outlet } from "react-router"






function App() {





  //loading state bnaye jb ap data fetch krege to appwrite se any pe time lgega to loading state bna lo
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  //jese application load hu to useEfffect lo or pochu login hu ya nahi hu

  useEffect(() => {
    authservice.getCurrentUser()
      //ager data fetch hu jaye successfully to then lgao
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))   //ager userData mily to login dispatch kro wrna logout
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))  //jb kam hu jaye loading false kr di
  }, [])
  //return kro ager loading ni ha to true kia ha or false kia ((null )
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-400">
  <div className="w-full block">
    <Header />
  </div>

  <main className="flex-grow">
     <Outlet /> 
    
  </main>

  <div className="w-full">
    <Footer />
  </div>
</div>

  ) : null
}

export default App
