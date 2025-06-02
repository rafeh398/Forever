

import { useState } from "react"
import './App.css'
import { useEffect } from "react"
import ThemeBtn from "./components/ThemeBtn"
import Card from "./components/Card"
import { ThemeProvider } from "./context/themeContext"

function App() {
  const [themeMode,setThemeMode]=useState("light")
  const darkTheme=()=>{
    setThemeMode("dark")
  }
  const lightTheme=()=>{
    setThemeMode("light")
  }

  const htmlBody=document.querySelector("html").classList

//actuall change functionality

useEffect(
  ()=>{
   htmlBody.remove("dark","light")
   htmlBody.add(themeMode)
  },[themeMode] 
) 
//themeMode change huga to useEffect mein changing hugi

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
    
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                      <ThemeBtn/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                     < Card />
                    </div>
                </div>
            </div>


    </ThemeProvider>

  )
}

export default App
