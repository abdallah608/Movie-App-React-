import React from 'react'
import { Helmet } from 'react-helmet'
import images from '../../imgs/banner_error.jpg'
export default function Notfound() {
  return (

    <>
      <Helmet>
         <meta charSet="utf-8" />
        <title>NotFound</title>
      
      </Helmet>

      <div className='text-center'>
        <img className='w-100' src={images} alt="" />
      </div>  
      
    </>
  )
}
