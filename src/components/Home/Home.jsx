import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styles from '../Home/Home.module.scss'


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
const [itemMovies, setItemMovies] = useState([])
const [itemTvshow, setItemTvshow] = useState([])
const [itemPeople, setItemPeople] = useState([])
  async function getTrending(mediaType , callback){
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=556c38300e86354eb4518e077f6843cc`)
    console.log(data.results);
    callback(data.results)
    if(getTrending == callback){
      setIsLoading(true)

    }else{
      setIsLoading(false)

    }
  }
  
useEffect(() => {
  getTrending('movie', setItemMovies);
  getTrending('tv',setItemTvshow);
  getTrending('person',setItemPeople);
  }, [])



  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
         <title>Home</title>
      </Helmet>
      

<div className="row">
{isLoading && (
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-center">
                  
                <i className="fas fa-spinner fa-spin fa-5x"></i>
                </div>
              </div>
            )} 
  </div>     

  <section>
  <div className="row gy-4 my-3 py-5">
      <div className="col-md-4 m-auto">
        <div>
        <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h3>Trending Movies</h3>
          <h3>to watch now</h3>
          <span className='text-muted'>most watched movies by day</span>
        <div className={`${styles.brdr} w-100 mt-4`}></div>
        </div>
      </div>
      {itemMovies.slice(0,10).map((item , index)=>
        <div key={index} className="col-md-2">
          <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
          <div className="item position-relative">
            <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
            <h2 className='h5 pt-3 text-center'>{item.title}</h2>
            <div className="bg-info p-2 position-absolute top-0 end-0">
          {item.vote_average.toFixed(1)}
        </div>
          </div>
          </Link>
        </div>
      )}
    </div>
</section>

<section>
<div className="row gy-4 my-3 py-3">
      <div className="col-md-4 m-auto">
        <div>
        <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h3>Trending TV</h3>
          <h3>to watch now</h3>
          <span className='text-muted'>most watched movies by day</span>
        <div className={`${styles.brdr} w-100 mt-4`}></div>
        </div>
      </div>
      {itemTvshow.slice(0,10).map((item , index)=>
        <div key={index} className="col-md-2">
          <Link  className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
        <div className="item position-relative">
            <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
            <h2 className='h5 pt-3 text-center'>{item.name}</h2>
            <div className="bg-info p-2 position-absolute top-0 end-0">
          {item.vote_average.toFixed(1)}
        </div>
          </div>
        </Link>
        </div>
      )}
    </div>

  
  </section>


  <section>
    
  <div className="row gy-4 my-3 py-3">
      <div className="col-md-4 m-auto">
        <div>
        <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h3>Trending People</h3>
          <h3>to watch now</h3>
          <span className='text-muted'>most watched movies by day</span>
        <div className={`${styles.brdr} w-100 mt-4`}></div>
        </div>
      </div>
      
      {itemPeople?.filter((item)=>item.profile_path !==null).map((item , index)=>
        <div key={index} className="col-md-2">
        <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
        <div className="item ">
            <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt="" />
            <h2 className='h5 pt-3 text-center'>{item.name}</h2>
            
          </div>
        
        </Link>
        </div>
      )}
    </div>
    
    
    </section>  
    </>
  )
}
