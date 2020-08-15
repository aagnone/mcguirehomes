import React, { useContext, useState, useEffect, useRef } from 'react'
import InlineEditText from '../components/inlineEditText'
import Fade from 'react-reveal/Fade'
import { AuthContext } from '../context/Auth'
import { Content } from '../context/Content'
import { db } from '../firebaseauth.config'
import ServiceCard from '../components/ServiceCard'

const ServicesPages = () => {
  const { user } = useContext(AuthContext)
  const { content, setContent, setPage, testFunction } = useContext(Content)

  useEffect(() => {
    setPage('services')
    db.collection('main')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === 'services') setContent(doc.data())
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
            <h2 style={{ fontSize: '3.3rem', textAlign: 'center' }}>Services</h2>
            <h3 style={{fontSize: '2rem'}}>McGuire Homes is a sub-contracting company that performs renovations projects for homes and apartment complexes, the company provides products and services.</h3>
          </Fade>
            <div className="special-grid">
              {content &&
                content.services &&
                content.services.map((service) => <ServiceCard service={service} />)}
            </div>
        </div>
      </main>
    </div>
  )
}

export default ServicesPages
