import React from 'react'
import { Helmet } from 'react-helmet'
import styles from '../Profile/Proflie.module.scss'
export default function Profile({userData}) {
  
  return (
    <>
          <Helmet>
         <meta charSet="utf-8" />
        <title>Profile</title>
      
      </Helmet>
    <div className='d-flex align-items-center justify-content-center '>
    <div className={ `card mt-5 shadow-lg ${styles.bgCard}`}>
  <div className="card-header ">
    Your Profile:
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <h3 className='pt-3'>Name: {userData?.first_name  } {userData?.last_name}</h3>
      <h3 className='pt-3'>Age: {userData?.age  } </h3>
      <h3 className='pt-3'>Email: {userData?.email  } </h3>

    </blockquote>
  </div>
</div>
    </div>

    </>
  )
}
