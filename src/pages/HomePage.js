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

const HomePage = () => {
  const { user } = useContext(AuthContext)
  const [headTextTransform, setHeadTextTransform] = useState('translate: (0, 0)')
  const [lastScrollY, setLastScroll] = useState(0)
  const [isEnded, setIsEnded] = useState(false)
  const { content, setContent, setPage, testFunction } = useContext(Content)
  const { galleryData, setGalleryData, setLoading } = useContext(GalleryImages)

  const videoRef = useRef(null)

  const listenToScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY) {
      setHeadTextTransform('translate(-7vw, 0)')
    } else {
      setHeadTextTransform('translate(0, 0)')
    }
    setLastScroll(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    videoRef.current.onended = function () {
      setIsEnded(true)
    }
    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  }, [])

  useEffect(() => {
    setPage('home')
    db.collection('main')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === 'home') setContent(doc.data())
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
    <div className='home-container'>
      <div className='background-video'>
        <video id='home-video' ref={videoRef} className='video' muted autoPlay>
          <source src={tempMovie} type='video/mp4' />
        </video>
        <div className='overlay' style={{ opacity: isEnded ? '.8' : '.3' }} />
      </div>
      <header>
        <h1 className='header-text' style={{ transition: 'all .6s ease', transform: headTextTransform }}>
          {user && content.header ? (
            <InlineEditText text={content.header} onSetText={text => testFunction('header', text)} />
          ) : (
              content.header
            )}
        </h1>
        {/* <button>View our Projects</button> */}
      </header>
      <main>
        <div className='firstContent'>
          <Fade left big>
            <h2 className="display-text">
              {user && content.section1header ? (
                <InlineEditText
                  text={content.section1header}
                  onSetText={text => testFunction('section1header', text)}
                />
              ) : (
                  content.section1header
                )}
            </h2>
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
        <div className='vert-line bg-main'></div>
        <div
          className='imageWrapper'
          style={{ transition: 'all .8s ease', transform: lastScrollY > 0 ? 'translateX(5vw)' : 'translateX(0)' }}>
          <img className='header-image' src={image1} alt='first' />
        </div>
      </main>
      <section>
        <Fade left>

          <img src={image2} alt='' />
        </Fade>
        <div>
          <Fade right big>
            <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
              {user && content.infoSection1Header ? (
                <InlineEditText
                  text={content.infoSection1Header}
                  onSetText={text => testFunction('infoSection1Header', text)}
                />
              ) : (
                  content.infoSection1Header
                )}
            </h3>
            <h4 style={{ fontSize: '1.6rem', marginTop: '1rem' }}>
              {user && content.infoSection1Content ? (
                <InlineEditText
                  text={content.infoSection1Content}
                  onSetText={text => testFunction('infoSection1Content', text)}
                />
              ) : (
                  content.infoSection1Content
                )}
            </h4>
          </Fade>
          <Fade right>
            <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
              {user && content.infoSection2Header ? (
                <InlineEditText
                  text={content.infoSection2Header}
                  onSetText={text => testFunction('infoSection2Header', text)}
                />
              ) : (
                  content.infoSection2Header
                )}
            </h3>
            <h4 style={{ fontSize: '1.6rem', marginTop: '1rem' }}>
              {user && content.infoSection2Content ? (
                <InlineEditText
                  text={content.infoSection2Content}
                  onSetText={text => testFunction('infoSection2Content', text)}
                />
              ) : (
                  content.infoSection2Content
                )}
            </h4>
          </Fade>
          <Fade right big>
            <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
              {user && content.infoSection3Header ? (
                <InlineEditText
                  text={content.infoSection3Header}
                  onSetText={text => testFunction('infoSection3Header', text)}
                />
              ) : (
                  content.infoSection3Header
                )}
            </h3>
            <h4 style={{ fontSize: '1.6rem', marginTop: '1rem' }}>
              {user && content.infoSection3Content ? (
                <InlineEditText
                  text={content.infoSection3Content}
                  onSetText={text => testFunction('infoSection3Content', text)}
                />
              ) : (
                  content.infoSection3Content
                )}
            </h4>
          </Fade>
          <button style={{ padding: '1rem' }}>Contact Us</button>
        </div>

      </section>
      <section
        style={{
          position: 'relative',
          marginTop: '30vh',
          height: '30vh',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 1rem',
        }}>
        <Fade left big>
          <h2 className="sub-text">
            {user && content.section2Header ? (
              <InlineEditText text={content.section2Header} onSetText={text => testFunction('section2Header', text)} />
            ) : (
                content.section2Header
              )}
          </h2>
        </Fade>
        <div
          className='bg-main'
          style={{
            width: '4px',
            height: '35vh',
            position: 'absolute',
            top: '75%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            paddingLeft: 0
          }}></div>
        <Fade right big>
          <h2 className="min">
            {user && content.section2Content ? (
              <InlineEditText text={content.section2Content} onSetText={text => testFunction('section2Header', text)} />
            ) : (
                content.section2Content
              )}
          </h2>
        </Fade>
      </section>
      <div style={{ marginTop: '30vh', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '3.5rem' }}>{galleryData.header}</h2>
        {user ? <UploadFile /> : null}
        {galleryData.images.length > 0 ? (
          <MasonryGallery
            data={galleryData}
          />
        ) : (
            <h3>Gallery Coming Soon</h3>
          )}
      </div>
    </div>
  )
}

export default HomePage
