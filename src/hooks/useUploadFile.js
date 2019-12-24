import React, { useState, useContext } from 'react'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import { GalleryImages } from '../context/Gallery'

const useUploadFile = () => {
  const { addImage, setLoading } = useContext(GalleryImages)
  const [image, setImage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [form, setForm] = useState({
    name: '',
    description: '',
    url: '',
    width: '',
    height: ''
  })

  const handleUploadStart = () => {
    setIsUploading(true)
    setProgress(0)
  }
  const handleProgress = progress => setProgress(progress)
  const handleUploadError = error => {
    setIsUploading(false)
    console.log(error)
  }
  const handleUploadSuccess = filename => {
    setProgress(100)
    setIsUploading(false)
    setImage(filename)
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url)
        setForm({ ...form, url })
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    addImage(form)
    setLoading(false)
    setForm({
      name: '',
      description: '',
      url: ''
    })
  }

  const handleChange = e => {
    e.persist()
    const target = e.target
    const value = target.value
    const name = e.target.name
    setForm(form => ({
      ...form,
      [name]: value
    }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Image Name: </label>
        <input type='text' value={form.name} name='name' onChange={handleChange} />
        <label>Image Description: </label>
        <input type='text' value={form.description} name='description' onChange={handleChange} />
        <label>Image Height</label>
        <input type='number' value={form.height} name='height' onChange={handleChange} />
        <label>Image Width</label>
        <input type='number' value={form.width} name='width' onChange={handleChange} />
        <label>Image:</label>
        {isUploading && <p>Progress: {progress}</p>}
        <FileUploader
          accept='image/*'
          name='image'
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        />
        <input type='submit' value='Add Image' />
      </form>
      <p>{form.name && form.name}</p>
      <p>{form.description && form.description}</p>
      <p>{form.height && form.height}</p>
      <p>{form.width && form.width}</p>
      {form.url && <img src={form.url} />}
    </div>
  )
}

export default useUploadFile
