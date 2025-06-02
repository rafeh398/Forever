import React from 'react'
import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <>
        < Header/>
        < Outlet/> 
         {/* //iska mtlb andr change hota rhega */}
        < Footer/>
        </>
        
    )
}

export default Layout
