import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./layout.jsx"
import Home from "./components/home.jsx"

import About from "./components/about.jsx"
import Contact from "./components/contact.jsx"
import User from "./components/user.jsx"
import Github , {githubinfo} from "./components/github.jsx"

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>  
      
      <Route  path="home" element={<Home/>}/>
      <Route  path="about" element={<About/>}/>
      <Route  path="contact" element={<Contact/>}/>
      <Route  path="user/:userid" element={<User/>}/>
      <Route  path="github"  loader={githubinfo} element={<Github/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
 < RouterProvider router={router}/>
  </StrictMode>,
)
