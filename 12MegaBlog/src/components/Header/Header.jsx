import React from 'react'
import {Container,Logo,LogoutBtn} from "../index"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//
//render lgao k ager login hu to ee logout btn display hu wrna ku hu

function Header() {
const authStatus=useSelector((state)=>state.auth?.status) 
const navigate=useNavigate()
const navItems=[   //sb items mein array lgao or objects mein rkho
    {
        name: "Home",
        slug: "/",   //iska url
        active:true
    }, {
        name: "Login",
        slug: "/login",
        active: !authStatus,    //user ager login ha to usey sign up or login ka btn ku dikhana
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
]  //authSlice se auth name mein state ka status

    return (       
        <>
        <header className="py-3 shadow bg-gray-500">
            {/* /Container k andr nav lgaya */}

        < Container>
        <nav className="flex">

            {/* yaha logo */}

            <div className="mr-4">
                <Link to ="/">
                < Logo width="70px" />
                </Link>
             

            </div>


            {/* yha ul */}

            <ul className="flex ml-auto">

                {/* yaha js likho or map lga k navItems iterate kr do */}

                {
                navItems.map((item)=>item.active? <li key={item.name}>
                        <button onClick={()=>navigate(item.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"> 
                            {item.name}
                        </button>
                </li> :null)
                }
                {/* for log out */}
                    
                {/* //ager authStatus true huga to ee next kam huga (logoutBtn lo)*/}
                {authStatus && (
                    <li>
                        < LogoutBtn/>
                    </li>
                )}
            </ul>

        </nav>

        </Container>
        </header>
        </>
    )
}

export default Header
