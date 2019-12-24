import React, { useState, useContext } from 'react'
import * as firebase from 'firebase'
import { AuthContext } from '../context/Auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setErrors] = useState('')
  const { user, setUser } = useContext(AuthContext)

  const handleForm = e => {
    e.preventDefault()
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user) {
          setUser(res.user)
        }
      })
      .catch(e => {
        setErrors(e.message)
      })
  }

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h1>Login</h1>
        <p>{user ? 'you are logged in' : 'not logged in'}</p>
        <form onSubmit={e => handleForm(e)}>
          <input value={email} onChange={e => setEmail(e.target.value)} name='email' type='email' placeholder='email' />
          <input
            onChange={e => setPassword(e.target.value)}
            name='password'
            value={password}
            type='password'
            placeholder='password'
          />
          <button type='submit'>Login</button>
          <span>{error}</span>
        </form>
      </div>

    </div>
  )
}

export default Login
