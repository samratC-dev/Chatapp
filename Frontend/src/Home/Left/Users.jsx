import React from 'react'
import User from './User'
import useGetAllUsers from '../../Context/useGetAllUsers'
import Loading from '../../Components/Loading'

const Users = () => {
  const [allUsers, loading] = useGetAllUsers()
  console.log('All users:', allUsers)

  return (
    <div>
      <h1 className="px-6 py-2 text-lg font-semibold text-blue-400">Messages</h1>
      <div>
        {loading ? (
          <Loading />
        ) : (
          allUsers.map((user, index) => (
            <User key={user._id || index} user={user} />
          ))
        )}
      </div>
    </div>
  )
}

export default Users
