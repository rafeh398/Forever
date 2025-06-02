import { useState } from 'react'


import './App.css'

function App() {
  // let counter= 15

  let [counter, setCounter]=useState(15)  // 1st parameter is variable 2nd is function


  const addvalue= ()=>{

    setCounter(counter+1) //setcounter keta new value kia deni
  }

    const removevalue=()=>{
      setCounter(counter-1)  //function k andr lga liya usestate ka 2nd paramter 
    } 
  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={addvalue}>Add Value</button>
      <br />
      <button onClick={removevalue}>Remove Value</button>
      <p>footer: {counter}</p>
    </>
  );
}

export default App;
