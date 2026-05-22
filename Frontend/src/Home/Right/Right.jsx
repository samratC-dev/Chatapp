import React, { useEffect } from 'react'
import Chatuser from './Chatuser.jsx'
import Messages from './Messages.jsx'
import Typesend from './Typesend.jsx'
import useConversation from '../../Zustand/useConversation'
import { useAuth } from '../../Context/Authprovider.jsx'
import { CiMenuFries } from 'react-icons/ci'

function Right({ onOpenLeft }) {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="w-full bg-slate-900 text-gray-300 flex flex-col h-screen">
      {!selectedConversation ? (
        <NoChatSelected onOpenLeft={onOpenLeft} />
      ) : (
        <>
          <Chatuser onOpenLeft={onOpenLeft} />
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  )
}

export default Right

const NoChatSelected = ({ onOpenLeft }) => {
  const { authUser } = useAuth()

  return (
    <div className="relative flex flex-col h-full">
      {/* Hamburger — mobile only */}
      <div className="flex items-center h-14 px-4 bg-slate-800 lg:hidden">
        <button onClick={onOpenLeft} className="text-white p-1">
          <CiMenuFries className="text-xl" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <h1 className="text-center text-gray-400 text-sm sm:text-base">
          Welcome{' '}
          <span className="font-semibold text-white text-lg">
            {authUser?.user?.fullname}
          </span>
          <br />
          <span className="mt-2 block">
            No chat selected. Select a contact to start a conversation.
          </span>
        </h1>
      </div>
    </div>
  )
}