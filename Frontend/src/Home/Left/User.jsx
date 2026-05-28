  import React from 'react'
  import useConversation from '../../Zustand/useConversation'
  import { useSocketContext } from '../../Context/SocketContext';

  const User = ({ user }) => {
    if (!user?.username) return null;

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
    return (
      <div>
        <div
          onClick={() => setSelectedConversation(user)}
          className={`flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-slate-800 duration-300 
            ${isSelected ? 'bg-slate-800' : ''
            }`
          }
        >
          {/* Avatar */}
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <span className="text-lg font-semibold text-gray-300 flex items-center justify-center w-full h-full">
                {user?.username?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-sm font-semibold">{user.username}</h1>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </div>
        <div className="border-b border-gray-800 mx-4"></div>
      </div>
    )
  }

  export default User
