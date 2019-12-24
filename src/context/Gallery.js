import React, { useState, useEffect, useContext } from 'react'
import { db } from '../firebaseauth.config'

export const GalleryImages = React.createContext()

export const GalleryImagesProvider = ({ children }) => {
  const [galleryData, setGalleryData] = useState({
    header: 'Our Latest Projects',
    names: [],
    images: [],
    descriptions: [],
    heights: [],
    widths: []
  })
  const [loading, setLoading] = useState(true)

  const addImage = ({ name, description, url, height, width }) => {
    setGalleryData({
      ...galleryData,
      names: [...galleryData.names, name],
      images: [...galleryData.images, url],
      descriptions: [...galleryData.descriptions, description],
      heights: [...galleryData.heights, height],
      widths: [...galleryData.widths, width]
    })
  }

  const removeImage = url => {
    const tempImages = galleryData.images
    const index = tempImages.indexOf(url)
    console.log(url)
    if (index > -1) {
      tempImages.splice(index, 1)
    }
    console.log(tempImages)
    setGalleryData({
      ...galleryData,
      images: tempImages
    })
  }

  useEffect(() => {
    if (!loading)
      db.collection('main')
        .doc('images')
        .set(galleryData)
    return
  }, [galleryData])

  return (
    <GalleryImages.Provider value={{ galleryData, setGalleryData, addImage, setLoading, removeImage }}>
      {children}
    </GalleryImages.Provider>
  )
}
