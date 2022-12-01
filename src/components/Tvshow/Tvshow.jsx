import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
export default function Tvshow() {
  const [isLoading, setIsLoading] = useState(true)
  const [itemTvshow, setItemTvshow] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [Pages, setPages] = useState([])

  let geTvshowData= async()=>{
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=556c38300e86354eb4518e077f6843cc&page=${currentPage}`)
    console.log(data.results);
    setItemTvshow(data.results)
    let pagesList = new Array(10).fill(0).map((page,i)=>i+1)
    setPages(pagesList);
    if(geTvshowData == setItemTvshow){
      setIsLoading(true)
    }else{
        setIsLoading(false)
    
      }
    
   
  }
  useEffect(() => {
    geTvshowData();
    }, [currentPage])
    function changePage(pageIndex){
      setCurrentPage(pageIndex);
    }
    function nextPage(){
      setCurrentPage(currentPage + 1)
    }
   function perviousPage(){
      setCurrentPage(currentPage - 1)
    }  

    
    async function search(e){
      if(e.target.value){
        let {data}= await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=556c38300e86354eb4518e077f6843cc&query=${e.target.value}&include_adult=false`)
        setItemTvshow(data.results)
      }else{
       geTvshowData()
      }
    }
  return (
    <>
          <Helmet>
         <meta charSet="utf-8" />
        <title>Tvshow</title>
      
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

<input type="search" className="form-control mt-5 w-75 m-auto"  placeholder='Search...'  onChange={search}/>

    <div className="row gy-4 my-3 py-5">
      
      {itemTvshow.map((item , index)=>
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
    <div className='d-flex align-items-center justify-content-center'>
        <nav aria-label="...">
  <ul className="pagination">
    <li className={currentPage <= 1 ?"page-item disabled" :"page-item"}>
      <a className="page-link" onClick={()=>perviousPage()}>Previous</a>
    </li>
    {Pages.map((page,index)=><><li key={index} className={ page == currentPage ?"page-item active" :"page-item"} aria-current="page">
      <a className="page-link" onClick={()=>changePage(page)}>{page}</a>
    </li></>)}
    <li className={currentPage >= 10 ?"page-item disabled" :"page-item" }>
      <a className="page-link" onClick={()=>nextPage()}>Next</a>
    </li>
  </ul>
</nav>
        </div>
    </>
  )
}
