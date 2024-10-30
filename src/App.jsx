import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Link to={'/add'}>
        <button>명함 만들기</button>
      </Link>
    </>
  )
}

export default App