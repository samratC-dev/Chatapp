import React, { useState } from 'react'
import axios from 'axios'
import useConversation from '../../Zustand/useConversation'
import cookies from 'js-cookie'

const Typesend = () => {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const { selectedConversation, messages, setMessages } = useConversation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || !selectedConversation) return

    setSending(true)
    try {
      const token = cookies.get('jwt')
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message },
        { headers: { Authorization: `bearer ${token}` } }
      )
      setMessages([...messages, res.data])
      setMessage('')
    } catch (error) {
      console.log('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-shrink-0">
      <div className="flex items-center gap-2 h-14 sm:h-16 px-3 sm:px-4 bg-gray-800">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 min-w-0 border border-gray-700 rounded-xl outline-none px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white text-sm sm:text-base placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={sending}
          className="flex-shrink-0 p-2 rounded-full hover:bg-gray-700 duration-200 disabled:opacity-50"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default Typesend