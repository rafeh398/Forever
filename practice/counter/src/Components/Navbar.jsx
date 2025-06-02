import React from 'react'
import Button from "./Button"

function Navbar({count}) {
  return (
    <div>
      <h1>NAvbar</h1>
      
      <Button count={count}/>
    </div>
  )
}

export default Navbar
