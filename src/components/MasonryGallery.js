import React, { useState, useContext } from 'react';
import Gallery from "react-photo-gallery";
import Photo from './Photo'
import { AuthContext } from '../context/Auth'

export default function MasonryGallery({ data: { descriptions, images, names, widths, heights } }) {
  const { user } = useContext(AuthContext)
  const [photos, setPhotos] = useState(images.map((image, i) => ({
    src: image,
    width: widths[i],
    height: heights[i]
  })))

  const imageRenderer =
    ({ index, left, top, key, photo }) => (
      <Photo
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    )


  return (
    <div>
      {user ?
        <Gallery photos={photos} renderImage={imageRenderer} />
        :
        <Gallery photos={photos} direction={'column'} />}
    </div>
  );
}