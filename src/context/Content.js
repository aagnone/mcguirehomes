import React, { useState, useEffect, useContext } from 'react'
import { db } from '../firebaseauth.config'
import { AuthContext } from './Auth'

export const Content = React.createContext()

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({})
  const [page, setPage] = useState('')
  const { user } = useContext(AuthContext)

  const testFunction = (key, value) => {
    setContent({
      ...content,
      [key]: value
    })
  }

  useEffect(() => {
    if (user != null)
      db.collection('main')
        .doc(page)
        .set(content)
    return
  }, [content])

  return <Content.Provider value={{ content, setContent, setPage, testFunction }}>{children}</Content.Provider>
}
