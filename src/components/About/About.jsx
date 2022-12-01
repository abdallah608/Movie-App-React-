import React from 'react'
import { Helmet } from 'react-helmet'
import './About.css'

export default function About() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
         <title>About</title>
      </Helmet>

    <div className=' About-bg pt-5 pb-5 mt-5'>
  
  <div className='text-center pt-5'>

 <h2 className=' fw-bolder text-center text-white'>ABOUT</h2>

<div className='d-flex justify-content-center'>
<div className='About-line'></div>
 <i class="fa-solid fa-star fa-2x text-white p-3 pb-4"></i>
<div className='About-line'></div>
</div>

 </div>  
 <div className='container'>
   <div className='row'>

 <div className='col-md-4 ms-auto'>

 <p className='text-white lead fw-normal'>Films about making films, about the movies, meta-films and movies about Hollywood ans such is a fun watch for film coinneseurs. Here are some great ones about the subject, or with this as a central part of the movie.</p>
 </div>
 <div className='col-md-4 me-auto'>
<p className='text-white lead fw-normal'>One of the most parodied movie lines in cinema — even Ryan O’Neal himself poked fun at it in Peter Bogdanovich's screwball comedy What's Up, Doc?. When Barbra Streisand quotes it."</p>
 
 </div>

   </div> 
 </div>
 
</div>

    </>
    )
}
