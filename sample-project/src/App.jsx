import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    console.log("Hello World");
  },[count])
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  return (
    <>
      <div className="div">
        <h1 className="">Counter App</h1>
        <p className="">Click the button to increment the counter.</p>
        <div className='buttons'>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
        <p>Count: {count}</p>
      </div>
    </>
  )
}

export default App
