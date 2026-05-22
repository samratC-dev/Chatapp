import React, { createContext, useContext, useState } from 'react'
import Cookies from "js-cookie"

export const Authcontext = createContext()

export const AuthProvider = ({ children }) => {
  const intialUserstate = Cookies.get("jwt") || localStorage.getItem("chat user")
  const [authUser, setAuthUser] = useState(intialUserstate ? JSON.parse(intialUserstate) : undefined)
  
  return (
    <Authcontext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </Authcontext.Provider>
  )
}

export const useAuth = () => useContext(Authcontext)

export default AuthProvider
