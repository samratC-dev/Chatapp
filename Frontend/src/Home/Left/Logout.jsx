import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useAuth } from '../../Context/Authprovider'

const Logout = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuth()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await axios.post('/api/user/logout')
      localStorage.removeItem('chat user')
      Cookies.remove('jwt')
      window.location.reload()
    } catch (error) {
      console.log('Error in logout:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-shrink-0 border-t border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* User info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-gray-300">
              {authUser?.user?.fullname?.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-300 truncate">{authUser?.user?.fullname}</span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="text-gray-400 hover:text-white hover:bg-slate-700 duration-200 rounded-full p-2 flex-shrink-0 disabled:opacity-50"
          title="Logout"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Logout