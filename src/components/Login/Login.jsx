
import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {

const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    'email':'',
    'password':'',
  })
const [errorList, setErrorList] = useState([])
let validateFormData=()=>{
  const schema = Joi.object({
    email:Joi.string().required().email({tlds:{allow:['com','net']}}),
    password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/))
  })
  return schema.validate(user,{abortEarly:false})
}
  let navigate=useNavigate();
  let goToHome=()=>{
    navigate('/')
  };

  const [errorMsg, setErrorMsg] = useState('')

  let  submitFormData=async (e)=>{
    setLoading(false)
    e.preventDefault();
    let validationResponse=validateFormData();
    if(validationResponse.error){
      setErrorList(validationResponse.error.details)
    }
    else{
      let {data}=  await axios.post("https://sticky-note-fe.vercel.app/signin" , user)
      console.log(data); 
      if(data.message=="success"){
        localStorage.setItem('token',data.token);
        saveUserData();
        goToHome();
      }else{
        setLoading(true)
        setErrorMsg(data.message)
      };
    }
}


  let getInputData=(e)=>{
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    console.log(myUser);
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
         <title>Login</title>
      </Helmet>

     <div className=' w-75 m-auto my-5'>
     <h2>Login Form</h2>
    
    {errorList.map((err,index)=><div key={index} className='alert alert-danger p-2'>{err.message}</div>)}
    
    {errorMsg?<div className='alert alert-danger p-2'>{errorMsg}</div>:null}
    
    
    <form onSubmit={submitFormData}>
  
    <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input onChange={getInputData} type="email" className="form-control" name='email' placeholder="name@example.com" />
     </div>
     <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
        <input onChange={getInputData} type="password" className="form-control" name='password' placeholder="Minimum 8 characters" />
     </div>
      

     <button className='btn btn-info mt-3 float-end'> {loading?`Login`:<i className='fas fa-spinner fa-spin'></i>}</button>
      <div className="clearfix"></div>
    </form>
    </div>

    
    
    </>
  )
}
