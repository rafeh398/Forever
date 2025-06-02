import { useCallback, useState , useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)

  const [password, setPassword] = useState("")


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"  //ager number hain to str mein add kr do
    if (character) str += "!@#$%^&*-_+=[]{}~`" //ager character ha number mein add kr do

    for (let i = 1; i <length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) //char mein a gyi value random 
      // jo str ki lenghth se multiply ha
      pass += str.charAt(char)  //char ki value for example ayi 2 then str ka index 2 a jayega pass mein or
      //  loop se kafi str a jayege length k equal
    }

    setPassword(pass)  //setPassword ka mtlb ha new value jo hu pass wali hu

  }, [number, character, setPassword])

  const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
     //is pe click krne se frontend acha hota

    window.navigator.clipboard.writeText(password) //kam just is pe hu jata tha

  }, [password])  //password pe depend kr rha

  useEffect(()=>{  //can be used directly iske andr usecallback run kro
    passwordGenerator()

  }, [length,number,character,passwordGenerator])  

  //***************Use ref */  //variable bnana prta
  const passwordRef=useRef(null)

  return (
    <>
      <div className=" flex items-center justify-center bg-gray-100">

        <div className="w-full max-w-md shadow-md rounded-lg px-28 py-5 bg-gray-500 text-orange-500 ms-16">
          <h2 className="text-center text-white">Password Generator</h2>
          <div className="w-full px-2 py-5">
            <input
              type="text"
              value={password}
              placeholder="Generated Password"
              className="w-full p-2 text-center rounded-md text-black"
              readOnly
              ref={passwordRef}
            />
            <button className="my-1" onClick={copyPasswordToClipboard}>
              copy
            </button>
            <div className="flex items-center text-lg">
              <input type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => { setLength(e.target.value) }}   // set length ka mtlb tha new value aye to 
              // to new value show hugi on change


              />
              <label>length: {length}</label>

            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);// new value jo b aye wo change hu k aye //setnumber =new number aye
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={character}
                id="characterInput"
                onChange={() => {
                  setCharacter((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}



export default App
