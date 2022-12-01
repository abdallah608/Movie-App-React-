import React from 'react'
import { Helmet } from 'react-helmet'
import './Network.css'
export default function Network() {
  return (
    
    <>
          <Helmet>
         <meta charSet="utf-8" />
        <title>Contact</title>
      
      </Helmet>
      <div className=' py-3 mt-1'>


<div className=' text-center pt-5'>
<h2 className='contact-tittle fw-bold'>CONTACT ME</h2>
<div className='d-flex justify-content-center'>
  <div className='Contact-line'></div>
<i class=" icon-tittle fa-solid fa-star fa-2x  p-3"></i>
  <div className='Contact-line'></div>
</div>

</div>
<div className='container'>
  <div className='row'>
<div className='col-md-8 m-auto p-4'>
<input className="form-control border-0 border-bottom  fs-4  " id="name" type="text" placeholder="Name" required="required" data-validation-required-message="Please enter your name." aria-invalid="false" />
</div>
<div className='col-md-8 m-auto p-4'>
  
<input className="form-control  border-0 border-bottom fs-4" id="email" type="email" placeholder="Email Address" required="required" data-validation-required-message="Please enter your email address." aria-invalid="false" />

</div>
<div className='col-md-8 m-auto p-4'>

<input className="form-control  border-0 border-bottom fs-4" id="phone" type="tel" placeholder="Phone Number" required="required" data-validation-required-message="Please enter your phone number." aria-invalid="false" />

</div>
<div className='col-md-8 m-auto p-4'>


<textarea className="form-control  border-0 border-bottom fs-4" id="message" rows={3} placeholder="Message" required="required" data-validation-required-message="Please enter a message." aria-invalid="false" defaultValue={""} />

<button className="Contact-btn btn btn-success border-0  btn-xl my-3 py-3 px-5" id="sendMessageButton" type="submit">Send</button>
</div>



  </div>
</div>

</div>
    

    </>
  )
}
