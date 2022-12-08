import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';


export default function Register() {
const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    'first_name':'',
    'last_name':'',
    'age':'',
    'email':'',
    'password':'',
  })
const [errorList, setErrorList] = useState([])
let validateFormData=()=>{
  const schema = Joi.object({
    first_name:Joi.string().alphanum().required().min(3).max(15).messages({
      "string.empty": "First Name is required",
      "string.min": "You have enter at least 3 characters",
    }),
    last_name:Joi.string().alphanum().required().min(3).max(15).messages({
      "string.empty": "Last Name is required",
      "string.min": "You have enter at least 3 characters",
    }),
    age:Joi.number().required().min(15).max(80).messages({
      "string.empty": "Age is required",
      "string.min": "You have enter your age",
    }),
    email:Joi.string().required().email({tlds:{allow:['com','net']}}).messages({
      "string.empty": "Email is required",
      "string.min": "You have enter your Email",
    }),
    password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)).messages({
      "string.empty": "Password is required",
      "string.min": "Minimum 8 characters",
    })
  })
  return schema.validate(user,{abortEarly:false})
}
  let navigate=useNavigate();
  let goToLogin=()=>{
    navigate('/login')
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

        let {data}=  await axios.post("https://sticky-note-fe.vercel.app/signup" , user)
      console.log(data);
      setLoading(true);
 
      if(data.message=="success"){
        setLoading(false);
        goToLogin()
      }else{
        setLoading(false);
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
        <title>Register</title>
      
      </Helmet>
    <div className=' w-75 m-auto my-5'>
     <h2>Registration Form</h2>
    
    {errorList.map((err,index)=><div key={index} className='alert alert-danger p-2'>{err.message}</div>)}
    
    {errorMsg?<div className='alert alert-danger p-2'>{errorMsg}</div>:null}
    
    
    <form onSubmit={submitFormData}>
    <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
        <input onChange={getInputData} type="text" className="form-control" name='first_name' placeholder="Enter your first name" />
        
     </div>
    <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">Last name</label>
        <input onChange={getInputData} type="text" className="form-control" name='last_name' placeholder="Enter your last name" />
     </div>
 
    <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">Age</label>
        <input onChange={getInputData} type="number" className="form-control" name='age' placeholder="Your Age expamle'23" />
     </div>
    <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input onChange={getInputData} type="email" className="form-control" name='email' placeholder="name@example.com" />
     </div>
     <div className="mb-3 pt-3">
       <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
        <input onChange={getInputData} type="password" className="form-control" name='password' placeholder="Minimum 8 characters" />
     </div>
      
      <button className='btn btn-info mt-3 float-end'> {loading?`Register`:<i className='fas fa-spinner fa-spin'></i>}</button>
      <div className="clearfix"></div>
    </form>
    </div>
    </>
    )
}
