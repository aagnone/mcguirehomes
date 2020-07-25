import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { AuthContext } from '../context/Auth'
import App from '../firebaseauth.config'

const Nav = () => {
  const { user } = useContext(AuthContext)
  const [lastScrollY, setLastScroll] = useState(0)
  const [slide, setSlide] = useState(0)
  const [transform, setTransform] = useState('translate(5vw, 30px)')

  const listenToScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY) {
      setSlide('-8vh')
      setTransform('translate(5vw, 3vh) scale(.6)')
    } else {
      setSlide('0px')
      setTransform('translate(5vw, 30px)')
    }
    setLastScroll(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  }, [])

  return (
    <nav
      style={{
        transform: `translate(0, ${slide})`,
        transition: 'all .6s ease',
        background: lastScrollY > 0 ? 'rgba(244, 238, 237, .97)' : 'transparent',
        borderBottom: lastScrollY > 0 ? '2px solid rgba(61,56,56,.15)' : 'transparent'
      }}>
      <img
        src={logo}
        className='logo'
        alt='Logo'
        style={{
          transform: transform,
          transition: 'transform .6s ease'
        }}
      />
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/services'>Services</Link>
        <Link to='/projects'>Projects</Link>
        <Link to='/contact'>Contact</Link>
        {user ? (
          <a href='#' onClick={() => App.auth().signOut()}>
            Log Out
          </a>
        ) : (
          <Link to='/adminSignIn'>Admin Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Nav
