import React, { useContext, useState, useEffect, useRef } from 'react'
import InlineEditText from '../components/inlineEditText'
import Fade from 'react-reveal/Fade'
import { AuthContext } from '../context/Auth'
import { Content } from '../context/Content'
import { GalleryImages } from '../context/Gallery'
import { db } from '../firebaseauth.config'
import UploadFile from '../hooks/useUploadFile'
import MasonryGallery from '../components/MasonryGallery'

import tempMovie from '../images/homePage.mp4'
import image1 from '../images/homeImage1.jpeg'
import image2 from '../images/image1.jpeg'
import EmployeeCard from '../components/EmployeeCard'

const AboutPage = () => {
  const { user } = useContext(AuthContext)
  const { content, setContent, setPage, testFunction } = useContext(Content)

  useEffect(() => {
    setPage('about')
    db.collection('main')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === 'about') setContent(doc.data())
        })
      })
    return
  }, [])

  return (
    <div className="home-container">
      <header>
        <h1 className='header-text'>
          {user && content.header ? (
            <InlineEditText text={content.header} onSetText={text => testFunction('header', text)} />
          ) : (
              content.header
            )}
        </h1>
      </header>
      <main className="d-block">
        <div style={{ width: '80%', margin: '0 auto'}}>
          <Fade left big>
            <h2 className="left-line-trail" style={{position: 'relative', fontSize: '3.3rem', textAlign: "center", marginLeft: '10vw' }}>
                About Us
            </h2>
          </Fade>
          <Fade right>
            <p style={{ fontSize: '1.8rem ' }}>
              {user && content.section1content ? (
                <InlineEditText
                  text={content.section1content}
                  onSetText={text => testFunction('section1content', text)}
                />
              ) : (
                  content.section1content
                )}
            </p>
          </Fade>
        </div>
        <div style={{ width: '80%', margin: '0 auto'}}>
            <Fade left big>
                <h2 className="right-line-trail" style={{ position: 'relative', fontSize: '3.3rem',  marginLeft: '10vw' }}>
                    Our Employees
                </h2>
            </Fade>
            <Fade up>
                <div className="special-grid">
                    {
                       (content && content.employees) && content.employees.map(employee => <EmployeeCard employee={employee} />)
                    }
                </div>
            </Fade>
        </div>
      </main>
    </div>
  )
}

export default AboutPage
