import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789" 
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
      
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipboard = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
     <div className='container flex justify-center '>
      <div className="innerContainer bg-gradient-to-tl from-green-950 to-green-700 rounded-xl justify-center align-middle">

         <div className="upper bg-black rounded-2xl">

          <input 
            className='input bg-white  w-4/5 ml-3 my-4 p-3 rounded-lg text-3xl' 
            type="text" 
            placeholder='Password'
            readOnly
            value={password}
            ref={passwordRef}
          />

          <button
            className='bg-green-700 text-3xl p-3 rounded-lg'
            onClick={copyPasswordToClipboard}
           >Copy</button>

           <div className="lengthControl">
             <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='mx-4 cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
                />
              <label className='text-white'>Length: {length}</label>
           </div>

            <div className="controls flex gap-12 py-6 text-xl ml-5">

              <div className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={numberAllowed}
                    id="numberInput"
                    onChange={() => {
                        setNumberAllowed((prev) => !prev);
                    }}
                />
                <label className='text-white' htmlFor="numberInput">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={charAllowed}
                        id="characterInput"
                        onChange={() => {
                            setCharAllowed((prev) => !prev )
                        }}
                    />
                    <label className='text-white'htmlFor="characterInput">Characters</label>
              </div>
            </div>

         </div>

         <div className="lower text-white bg-black rounded-2xl flex align-middle justify-center"><img className='h-60 w-62' src="https://www.icegif.com/wp-content/uploads/2022/01/icegif-179.gif" alt="" /><p className='text-4xl'>Generate Your Password</p></div>

      </div>
     </div>
    </>
  )
}

export default App
