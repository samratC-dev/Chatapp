import React, { useState } from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'
import { IoClose } from 'react-icons/io5'

const Left = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex flex-col h-full bg-black text-gray-300 w-full">
      {/* Close button — mobile only */}
      <div className="flex items-center justify-between px-4 pt-4 lg:hidden">
        <span className="text-lg font-semibold text-blue-400">Chats</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
          <IoClose className="text-2xl" />
        </button>
      </div>

      <Search onSearchChange={setSearchQuery} />

      <div className="flex-1 overflow-y-auto">
        <Users searchQuery={searchQuery} />
      </div>

      <Logout />
    </div>
  )
}

export default Left