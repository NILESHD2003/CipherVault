import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App(): React.JSX.Element {
  return (
    <div className='min-h-screen not-dark:bg-gray-50 max-w-8xl mx-auto'>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </div>
  )
}

export default App