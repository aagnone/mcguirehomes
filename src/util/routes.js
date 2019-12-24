import React from 'react'
import HomePage from '../pages/HomePage'
import Signin from '../pages/SignIn'

const routes = [
  { name: 'Home', path: '/', exact: true, main: () => <HomePage /> },
  { name: 'Admin Log In', path: '/adminSignIn', exact: true, main: () => <Signin /> }
]

export default routes

// admin@mcguirehomes.com
// jensamjoeanthony22!!
