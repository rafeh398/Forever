import { useState } from 'react'
import Provider from "./context/usercontextProvider"
import Login from "./components/login"
import Profile from "./components/profile"

import './index.css';
import './App.css';


function App() {


  return (
    <Provider>
      <Login/>
      < Profile/>
    </Provider>
  )
}

export default App
