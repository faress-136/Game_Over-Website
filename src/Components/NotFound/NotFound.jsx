import React from 'react'
import NotFoundImage from '../../Assets/Images/ErrorImg.jpeg'

export default function NotFound() {
  return (
    <div>
      <img className='img-fluid w-100' src={NotFoundImage} alt="" />
    </div>
  )
}
