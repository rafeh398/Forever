import React from 'react'
import { useTodo } from "../context"

function Button() {
    const todoCount=useTodo()
    
  return (
    <div>
  <h1>button</h1>
todoCount:{todoCount}
    </div>
  )
}

export default Button
