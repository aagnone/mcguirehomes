import React from 'react'
import HomePage from '../pages/HomePage'
import Signin from '../pages/SignIn'
import AboutPage from '../pages/AboutPage'
import ServicesPage from '../pages/ServicesPage'
import ProjectsPage from '../pages/ProjectsPage'

const routes = [
  { name: 'Home', path: '/', exact: true, main: () => <HomePage /> },
  { name: 'Admin Log In', path: '/adminSignIn', exact: true, main: () => <Signin /> },
  { name: 'About', path: '/about', exact: true, main: () => <AboutPage /> },
  { name: 'Services', path: '/services', exact: true, main: () => <ServicesPage /> },
  { name: 'Projects', path: '/projects', exact: true, main: () => <ProjectsPage /> },
  { name: 'Contact', path: '/contact', exact: true, main: () => <Signin /> }
]

export default routes

// admin@mcguirehomes.com
// jensamjoeanthony22!!
