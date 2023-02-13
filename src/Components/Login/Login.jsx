import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import gamingImg from "../../Assets/Images/gaming.jpg"
import axios from 'axios'
import Joi from 'joi'
import GameIcon from '../../Assets/Images/logo.png'


export default function Login({saveUser}) {

let [user,setUser] = useState({
  email:"",
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

async function login(e){
  e.preventDefault()
  if(validateLogin()){
    setIsLoading(true)
    let {data} = await axios.post('https://route-movies-api.vercel.app/signin',user)
    console.log(data)
    if(data.message == "success"){
      localStorage.setItem("token",data.token)
      saveUser()
      navigate('/')
      setApiError(null)
      setIsLoading(true)
    }
    else{
      setApiError(data.message)
      setIsLoading(false)
    }
  }

}

function validateLogin(){
    const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow:false} }).messages({
      "string.empty":"Email must be valid",
    }),
    password:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).messages({
      "string.empty":"Password must not be empty",
      "string.pattern.base":"Password must be 6-30"
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
    <title>Login Page</title>
</Helmet>
<div className="container my-auto mt-5">

  <div className="row gx-0">
    <div className="col-md-6">
      <img className='w-100 h-100 img-fluid' src={gamingImg} alt="" />
    </div>

    <div className="col-md-6 half_bg_color">
      <div className="py-5 px-2">
        <div className="text-center">
          <img className='logo_game_2' src={GameIcon} alt="" />
          <h4 className='mb-3'>Log in to GameOver</h4>
        </div>

      <form onSubmit={(e)=>(login(e))} className='p-2'>
        {apiError && <div className='alert alert-warning text-center p-2'>{apiError}</div>}

        

        <div className="form-group mb-3">
        <input onChange={(e)=>(getUserData(e))} id='email' name='email' className='form-control border-0' type="email" placeholder='Email Address'/>
        <div className={validationError.filter((ele) => ele.context.label == 'email')[0] ? "alert alert-warning text-center p-0 my-2 " : ""}>
            {validationError.filter((ele) => ele.context.label == 'email')[0]?.message}
            </div>
        </div>

        <div className="form-group mb-3">
        <input onChange={(e)=>(getUserData(e))} id='password' name='password' className='form-control  border-0 mb-4' type="password" placeholder='Password'/>
        <div className={validationError.filter((ele) => ele.context.label == 'password')[0] ? "alert alert-warning text-center p-0 my-2 " : ""}>
            {validationError.filter((ele) => ele.context.label == 'password')[0]?.message}
            </div>
        </div>

        <button className='w-100 p-2 border-1 rounded text-white btn_color mb-4'> {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}</button>
        <div className='w-100 mx-auto text-center border-top  border_color pt-3 mb-1'>
        <a onClick={()=>{alert("Please make a new Account.")}} className='p_font text-decoration-none' href="">Forget Password?</a>
        </div>
        <p className='p_font text-center mb-0'>Not a member yet? <Link className='no_hover text-decoration-none text_color' to={"/register"}>Create Account ></Link></p>

      </form>
      
      </div>
      
    </div>
  </div>
</div>
</>
)
}
