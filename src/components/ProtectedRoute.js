import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ component, reRouteComponent, ...options }) => {
  const { user } = useContext(AuthContext)
  const finalComponent = user ? component : reRouteComponent

  return <Route {...options} component={finalComponent} />
}

export default PrivateRoute
