import React, { useState } from 'react'
import useGetAllUsers from '../../Context/useGetAllUsers'
import useConversation from '../../Zustand/useConversation'
import toast from 'react-hot-toast'

const Search = () => {
  const [search, setSearch] = useState('')
  const [allUsers] = useGetAllUsers()
  const { setSelectedConversation } = useConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    const conversation = allUsers.find((user) =>
      user.username?.toLowerCase().includes(search.toLowerCase())
    )
    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else {
      toast.error('User not found')
    }
  }

  return (
    <div className="px-4 py-3 flex-shrink-0">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <label className="flex-1 border border-gray-700 bg-slate-900 rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="flex-1 min-w-0 outline-none bg-transparent text-sm text-gray-300 placeholder-gray-500"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="p-2 rounded-lg hover:bg-gray-700 duration-200 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Search