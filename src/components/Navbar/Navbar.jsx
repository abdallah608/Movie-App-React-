import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from '../Navbar/Navbar.module.scss'

export default function Navbar({userData ,logOut}) {

  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.bgNav}`}>
  <div className="container-fluid">
    <h5 className="navbar-brand" >Noxe</h5>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="movies">Movies</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="tvshow">Tv Show</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="people">People</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="about">About</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="network">Network</NavLink>
        </li>
  </ul> :''}
        
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             

      <div className='pe-3 border-end d-flex align-items-center justify-content-center m-auto text-white me-3 m-auto '>
        <i className='fa-brands fa-facebook  ms-3'></i>
        <i className='fa-brands fa-spotify ms-3'></i>
        <i className='fa-brands fa-instagram ms-3'></i>
        <i className='fa-brands fa-youtube ms-3 '></i>
      </div>
        {userData?<>
          <li className="nav-item">
          <NavLink  to='profile' className='nav-link m-auto px-2 '>WELCOME : {userData.first_name}</NavLink>
      </li>
          <li className="nav-item">
        <NavLink className="nav-link " aria-current="page" onClick={logOut}>Logout</NavLink>
      </li>
        </>
        :<> <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="register">Register</NavLink>
        </li>
        <li className="nav-item"> 
          <NavLink className="nav-link " aria-current="page" to="login">Login</NavLink>
        </li> </>}
        
      </ul>


    </div>
  </div>
</nav>

    
    
    </>
  )
}