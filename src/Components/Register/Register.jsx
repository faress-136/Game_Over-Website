import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gamingImg from "../../Assets/Images/gaming.jpg"
import axios from 'axios'
import Joi from 'joi'
import {Helmet} from 'react-helmet'


export default function Register() {

  let [user,setUser] = useState({
    first_name: "",
    last_name:"",
    email:"",
    age:0,
    password:""
  })

  let [validationError,setValidationError] = useState([])
  let [apiError,setApiError] = useState(null)
  let [isLoading,setIsLoading]= useState(false)
  let navigate = useNavigate()

  function getUserData(e){
    let myUser = {...user}
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function register(e){
    e.preventDefault()
    if(validateRegister()){
      setIsLoading(true)
      let {data} = await axios.post('https://route-movies-api.vercel.app/signup',user)
      console.log(data)
      if(data.message == "success"){
        navigate('/login')
        setApiError(null)
        setIsLoading(true)
      }
      else{
        setApiError(data.message)
        setIsLoading(false)
      }
    }
 
  }

  function validateRegister(){
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(20).required().messages({
        "string.empty":"First Name must not be empty",
        "string.min":"First Name must be greater than 3 characters",
        "string.max":"First Name must be smaller than 20 characters"
      }),
      last_name: Joi.string().min(3).max(20).required().messages({
        "string.empty":"Last Name must not be empty",
        "string.min":"Last Name must be greater than 3 characters",
        "string.max":"Last Name must be smaller than 20 characters"
      }),
      email: Joi.string().email({ minDomainSegments: 2, tlds: {allow:false} }).messages({
        "string.empty":"Email must be valid",
      }),
      password:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).messages({
        "string.empty":"Password must not be empty",
        "string.pattern.base":"Password must be 6-30"
      }),
      age: Joi.number().min(10).max(100).required().messages({
        "number.min":"Age must be greater than 10",
        "number.max":"Please enter a valid age"
      })
    })

    let validateRes = schema.validate(user,{abortEarly:false})
    if(validateRes.error){
      setValidationError(validateRes.error.details)
      return false
    }
    else{
      setValidationError([])
      return true
    }
  }

  useEffect(()=>{
// console.log(user)
  },[user])

  return (
    <>
    <Helmet>
    <title>Register Page</title>
    </Helmet>
    <div className="container my-auto mt-5">

      <div className="row gx-0">
        <div className="col-md-6">
          <img className='w-100 h-100 img-fluid' src={gamingImg} alt="" />
        </div>

        <div className="col-md-6 half_bg_color">
          <div className="py-5 px-2">
            <div className="text-center">
              <h4>Create My Account!</h4>
            </div>

          <form onSubmit={(e)=>(register(e))} className='p-2'>
            {apiError && <div className='alert alert-warning text-center p-2'>{apiError}</div>}

            <div className="form-group mb-3 row gx-3">
              <div className="col-md-6">
                <input onChange={(e)=>(getUserData(e))} id='first_name' name='first_name' className='form-control bg-dark border-0 text-white' type="text" placeholder='First Name'/>
                <div className={validationError.filter((ele) => ele.context.label == 'first_name')[0] ? "alert alert-warning text-center p-1 my-2 " : ""}>
                {validationError.filter((ele) => ele.context.label == 'first_name')[0]?.message}
                </div>
              </div>
              <div className="col-md-6">
                <input onChange={(e)=>(getUserData(e))} id='last_name' name='last_name' className='form-control bg-dark border-0 text-white' type="text" placeholder='Last Name'/>
                <div className={validationError.filter((ele) => ele.context.label == 'last_name')[0] ? "alert alert-warning text-center p-1 my-2 " : ""}>
                {validationError.filter((ele) => ele.context.label == 'last_name')[0]?.message}
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
            <input onChange={(e)=>(getUserData(e))} id='email' name='email' className='form-control bg-dark border-0 text-white' type="email" placeholder='Email Address'/>
            <div className={validationError.filter((ele) => ele.context.label == 'email')[0] ? "alert alert-warning text-center p-0 my-2 " : ""}>
                {validationError.filter((ele) => ele.context.label == 'email')[0]?.message}
                </div>
            </div>

            <div className="form-group mb-3">
            <input onChange={(e)=>(getUserData(e))} id='age' name='age' className='form-control bg-dark border-0 text-white' type="number" placeholder='Age'/>
            <div className={validationError.filter((ele) => ele.context.label == 'age')[0] ? "alert alert-warning text-center p-0 my-2 " : ""}>
                {validationError.filter((ele) => ele.context.label == 'age')[0]?.message}
                </div>
            </div>

            <div className="form-group mb-3">
            <input onChange={(e)=>(getUserData(e))} id='password' name='password' className='form-control bg-dark border-0 text-white' type="password" placeholder='Password'/>
            <div className={validationError.filter((ele) => ele.context.label == 'password')[0] ? "alert alert-warning text-center p-0 my-2 " : ""}>
                {validationError.filter((ele) => ele.context.label == 'password')[0]?.message}
                </div>
            </div>

            <button className='w-100 p-2 border-1 rounded text-white btn_color'> {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Create Account"}</button>
            <p className='text-muted text-center p_font p-2 mt-1 border-bottom border_color pb-3'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>

            <p className='p_font text-center mb-0'>Already a member? <Link className='no_hover text-decoration-none text_color' to={"/login"}>Login ></Link></p>

          </form>
          
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}
