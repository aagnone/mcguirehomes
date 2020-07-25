import React, { useContext, useState, useEffect, useRef } from 'react'
import InlineEditText from '../components/inlineEditText'
import Fade from 'react-reveal/Fade'
import { AuthContext } from '../context/Auth'
import { Content } from '../context/Content'
import { db } from '../firebaseauth.config'
import UploadFile from '../hooks/useUploadFile'
import { GalleryImages } from '../context/Gallery'
import MasonryGallery from '../components/MasonryGallery'

const AboutPage = () => {
  const { user } = useContext(AuthContext)
  const { content, setContent, setPage, testFunction } = useContext(Content)
  const { galleryData, setGalleryData, setLoading } = useContext(GalleryImages)

  useEffect(() => {
    setPage('projects')
    db.collection('main')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === 'projects') setContent(doc.data())
        })
      })
    return
  }, [])


  useEffect(() => {
    db.collection('main')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === 'images') setGalleryData(doc.data())
          setLoading(false)
        })
      })
    return
  }, [])

  return (
    <div className="home-container">
      <header>
        <h1 className="header-text">
          {user && content.header ? (
            <InlineEditText text={content.header} onSetText={(text) => testFunction('header', text)} />
          ) : (
            content.header
          )}
        </h1>
      </header>
      <main className="d-block">
        <div style={{ width: '80%', margin: '0 auto' }}>
          <Fade left big>
            <h2 style={{ fontSize: '3.3rem', textAlign: 'center' }}>Projects</h2>
          </Fade>
          <Fade up>
            <div>
                {user ? <UploadFile /> : null}
                {galleryData.images.length > 0 ? <MasonryGallery data={galleryData} /> : <h3>Gallery Coming Soon</h3>}
            </div>
          </Fade>
        </div>
      </main>
    </div>
  )
}

export default AboutPage
