import React, { useState } from 'react'
import Left from './Home/Left/Left'
import Right from './Home/Right/Right'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useAuth } from './Context/Authprovider'
import { Route, Routes, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { authUser } = useAuth()
  const [showLeft, setShowLeft] = useState(false)

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? (
          <div className="flex h-screen overflow-hidden">
            {/* Left panel — hidden on mobile, shown as overlay when toggled */}
            <div className={`
              fixed inset-y-0 left-0 z-40 w-72 bg-black transform transition-transform duration-300
              lg:static lg:translate-x-0 lg:w-80 lg:flex-shrink-0
              ${showLeft ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <Left onClose={() => setShowLeft(false)} />
            </div>

            {/* Overlay backdrop on mobile */}
            {showLeft && (
              <div
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setShowLeft(false)}
              />
            )}

            {/* Right panel */}
            <div className="flex-1 min-w-0">
              <Right onOpenLeft={() => setShowLeft(true)} />
            </div>
          </div>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </>
  )
}

export default App