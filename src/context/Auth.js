import React, { useEffect, useState } from 'react'
import app from '../firebaseauth.config'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    app.auth().onAuthStateChanged(setUser)
    return () => app.auth().onAuthStateChanged(setUser)
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
