import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function People() {
  const [isLoading, setIsLoading] = useState(true)
  const [itemPeople, setItemPeople] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [Pages, setPages] = useState([])
  let getPeopleData= async()=>{
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=556c38300e86354eb4518e077f6843cc&page=${currentPage}`)
    console.log(data.results);
    setItemPeople(data.results)
    let pagesList = new Array(10).fill(0).map((page,i)=>i+1)
    setPages(pagesList);
    if(getPeopleData== setItemPeople){
      setIsLoading(true)
    }else{
        setIsLoading(false)
    
      }
    
  }
  useEffect(() => {
    getPeopleData();
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
        let {data}= await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=556c38300e86354eb4518e077f6843cc&page=1&query=${e.target.value}&include_adult=false`)
      setItemPeople(data.results)
      }else{
        getPeopleData()
      }
    }
  return (
    <>
          <Helmet>
         <meta charSet="utf-8" />
        <title>People</title>
      
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
