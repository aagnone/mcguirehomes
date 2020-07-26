import React from 'react'
import HomePage from '../pages/HomePage'
import Signin from '../pages/SignIn'
import AboutPage from '../pages/AboutPage'
import ServicesPage from '../pages/ServicesPage'
import ProjectsPage from '../pages/ProjectsPage'
import MessagePage from '../pages/MessagePage'
import ContactPage from '../pages/ContactPage'

const routes = [
  { name: 'Home', path: '/', exact: true, main: () => <HomePage /> },
  { name: 'Admin Log In', path: '/adminSignIn', exact: true, main: () => <Signin /> },
  { name: 'About', path: '/about', exact: true, main: () => <AboutPage /> },
  { name: 'Services', path: '/services', exact: true, main: () => <ServicesPage /> },
  { name: 'Projects', path: '/projects', exact: true, main: () => <ProjectsPage /> },
  { name: 'Contact', path: '/contact', exact: true, main: () => <ContactPage /> },
  { name: 'Messages', path: '/messages', exact: true, main: () => <MessagePage /> }
]

export default routes

// admin@mcguirehomes.com
// jensamjoeanthony22!!
