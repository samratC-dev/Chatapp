import React from 'react'
import useConversation from '../../Zustand/useConversation'
import { useSocketContext } from '../../Context/SocketContext'
import { CiMenuFries } from 'react-icons/ci'

const Chatuser = ({ onOpenLeft }) => {
  const { selectedConversation } = useConversation()
  const { onlineUsers } = useSocketContext()

  if (!selectedConversation) return null

  const isOnline = onlineUsers.includes(selectedConversation._id)

  return (
    <div className="flex items-center gap-3 h-14 sm:h-16 px-4 bg-slate-800 flex-shrink-0">
      {/* Hamburger — mobile only */}
      <button onClick={onOpenLeft} className="text-white lg:hidden flex-shrink-0">
        <CiMenuFries className="text-xl" />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-semibold text-gray-300">
          {selectedConversation.username.charAt(0).toUpperCase()}
        </span>
      </div>

      {/* Name + status */}
      <div className="min-w-0">
        <h1 className="text-sm sm:text-base font-semibold text-white truncate">
          {selectedConversation.username}
        </h1>
        <span className={`text-xs ${isOnline ? 'text-green-400' : 'text-gray-500'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  )
}

export default Chatuser