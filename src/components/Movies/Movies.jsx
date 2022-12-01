import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Movies() {
  const [isLoading, setIsLoading] = useState(true)
  const [itemMovies, setItemMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [Pages, setPages] = useState([])
let getMoviesData= async()=>{
  let {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=556c38300e86354eb4518e077f6843cc&page=${currentPage}`)
  setItemMovies(data.results)
  let pagesList = new Array(10).fill(0).map((page,i)=>i+1)
  setPages(pagesList);
  if(getMoviesData== setItemMovies){
  
    setIsLoading(true)
}else{
    setIsLoading(false)

  }
}
useEffect(() => {
  getMoviesData();
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
    // console.log(e.target.value);
  if(e.target.value){
    let {data}=  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=556c38300e86354eb4518e077f6843cc&language=en-US&query=${e.target.value}&include_adult=false`)
    setItemMovies(data.results)
  
  }else{
    getMoviesData()
  }
  }

  return (
    <>

          <Helmet>  
        <meta charSet="utf-8" />
         <title>Movies</title>
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

      {itemMovies.map((item , index)=>
        <div key={index} className="col-md-2 ">
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
        <div>
      <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
  <li className={currentPage <= 1 ?"page-item disabled" :"page-item"}>
     <a className="page-link" onClick={()=>perviousPage()}>Previous</a>
 </li>
   {Pages.map((page,index)=><> <li key={index} className={ page == currentPage ?"page-item active" :"page-item"}>
    <a className="page-link" onClick={()=>changePage(page)} >{page}</a>
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
