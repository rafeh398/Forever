import React, { useState } from 'react'
import { assets } from "../../assets/assets"
import { NavLink,Link } from "react-router-dom"
import { useShop } from "../../context/shopContext"

function Navbar() {
    const[visible,setVisible]=useState(false)
    const{setShowSearch,getCartCount,logout}=useShop();
   const handleLogout=()=>{
      logout()
    }


    return (
        <div className="flex items-center justify-between py-5 font-medium">
           <Link to={"/"}>
           <img src={assets.logo} alt="" className="w-36" />
           </Link>
            <ul className="hidden sm:flex gap-5 text-gray-700 text-sm">
                <NavLink to="/" className={({ isActive }) => isActive ? " text-blue-500" : " text-gray-700"} >
                    HOME



                </NavLink>
                <NavLink to="/collection" className={({ isActive }) => isActive ? " text-blue-500" : " text-gray-700"}>
                    COLLECTION



                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? " text-blue-500" : " text-gray-700"}>
                    ABOUT



                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? " text-blue-500" : " text-gray-700"}>
                    CONTACT



                </NavLink>
               



            </ul>
            <div className="flex gap-6 items-center">
                <img src={assets.search_icon} alt="" className="w-5 cursor-pointer" onClick={()=>setShowSearch(true)} />
                <div className="group relative">
                   <Link to='/login'><img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" /></Link> 
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="  bg-slate-100 text-gray-500 py-3 px-5 rounded w-36 gap-2 flex flex-col ">
                            <p className="hover:text-black">My Profile</p>
                            <p className="hover:text-black">Orders</p>
                            <p onClick={handleLogout} className="hover:text-black cursor-pointer">Logout</p>
                        </div>

                    </div>
                </div>
                <Link to="/cart" className="relative">
                <img src={assets.cart_icon} alt="" className="w-5"/>
                <p className="absolute right-[-5px] bottom-[-5px] w-4 leading-4 bg-black aspect-square rounded-full text-white text-[8px] text-center ]">{getCartCount()}</p>
                </Link>
                <img  onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className="w-5 sm:hidden cursor-pointer "/>
                {/* sidebar for small screens */}

                <div className={`flex flex-col text-gray-500 ${visible ? "w-full":"w-0"} absolute top-0 right-0 bottom-0 bg-white overflow-hidden`}> 
                    <div className="flex   items-center p-3 gap-4 cursor-pointer" onClick={()=>setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="" className="rotate-180 h-4" />
                        <p>Back</p>

                    </div>
                    <NavLink to="/" className="py-3 pl-3 border" onClick={()=>setVisible(false)}>HOME</NavLink>
                    <NavLink to="/collection" className="py-3 pl-3 border" onClick={()=>setVisible(false)}>COLLECTION</NavLink>
                    <NavLink to="/about" className="py-3 pl-3 border" onClick={()=>setVisible(false)}>ABOUT</NavLink>
                    <NavLink to="/conatct" className="py-3 pl-3 border" onClick={()=>setVisible(false)}>CONTACT</NavLink>
                    
                </div>
            

            </div>
        </div>
    )
}

export default Navbar
