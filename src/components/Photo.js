import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { GalleryImages } from '../context/Gallery'


const CloseButton = (props) =>{
    const { removeImage, setLoading } = useContext(GalleryImages)

  const handleDelete = url => {
    setLoading(false)
    removeImage(url)
  }

   return(
  <div onClick={() => handleDelete(props.url)} style={{ position: 'absolute', top: '2px', right: '2px', cursor: 'pointer' }}>
    <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" /></svg>
  </div>
)};


const Photo = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected
}) => {
  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;


    const { user } = useContext(AuthContext)

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, position: 'relative' }}
    >
     {user ?  <CloseButton url={photo.src} /> : null}
      <img
        {...photo}
      />
    </div>
  );
};

export default Photo
