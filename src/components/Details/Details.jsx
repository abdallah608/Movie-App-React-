import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'


export default function Details() {
let params=useParams();

const [itemDetails, setItemDetails] = useState({})

let getItemDetails= async()=>{
  let {data}= await axios.get(`https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=556c38300e86354eb4518e077f6843cc`)
  setItemDetails(data);
}
useEffect(() => {
  getItemDetails()
}, [])

  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
        {itemDetails.title?<title>{itemDetails?.title}</title>:<title>{itemDetails?.name}</title>}
      </Helmet>
    <div className="row my-4 py-4">

      <div className="col-md-3 ">
      {params.mediaType=='person'?
      <img className='w-100 m-auto' src={'https://image.tmdb.org/t/p/original'+itemDetails.profile_path} alt="" /> :
      <img className='w-100 m-auto' src={'https://image.tmdb.org/t/p/original'+itemDetails.poster_path} alt="" />

    }
      </div>
      <div className="col-md-9">
        

        <h2 className='pt-5'>{itemDetails.title} {itemDetails.name}</h2>
        <p className='my-4 text-muted'>{itemDetails.tagline}{itemDetails.place_of_birth}</p>
        <ul className="list-unstyled d-flex">
                  {itemDetails?.genres?.map((genre) => (
                    <li className="bg-info me-3 p-2 rounded-5 text-lead">{genre.name}</li>
                  ))}
                </ul>
        {params.mediaType=='person'?
        '':<h3 className='h5 pt-2'>Vote :{itemDetails.vote_average}</h3>}
        
        {params.mediaType=='person'?
        '':<h3 className='h5 pt-4'>Vote Count {itemDetails.vote_count}</h3>}
        
        
        
        <h3 className='h5 pt-4'>popularity : {itemDetails.popularity}</h3>
        {params.mediaType=='person'?
        '':<h3 className='h5 pt-4'>release date :{itemDetails.release_date} </h3>}

        <p className='my-4 text-muted'>{itemDetails.overview}{itemDetails.biography}</p>
      </div>
    </div>
    </>
  )
}
