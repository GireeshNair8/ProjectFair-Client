import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {loginAPI, registerAPI} from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../contexts/ContextShare';

function Auth({register}) {
  const {isAuthToken, setIsAuthToken}= useContext(isAuthTokenContext)
  //create a state to hold the value of user registration details
  const [userData, setUserData]= useState({
    username:"",
    email:"",
    password:""
  })
    const navigate= useNavigate()
    const registerForm= register?true:false
    console.log(userData);

    //function to register
    const handleRegister=async(e)=>{
      e.preventDefault()
      const {username,email,password}= userData
      if(!username||!email||!password){
        toast.info('please fill the form completely')
      }
      else{
        const result= await registerAPI(userData)
        console.log(result.data);
        if(result.status==200){
          toast.success(`${result.data.username} is successfully registered`)
          setUserData({
            username:"",
            email:"",
            password:""
          })
          //navigate to login
          navigate('/login')
        }
        else{
          toast.error(result.response.data)
        }
      }
    }
    //function to login

    const handleLogin= async(e)=>{
      e.preventDefault()
      const {email, password}= userData
      if(!email || !password){
        toast.info('Please fill the form completely')
      }
      else{
        //api call
       const result= await loginAPI(userData)
      console.log(result);
      if(result.status===200){
        //alert
        toast.success('login successful')
        setIsAuthToken(true)
      //store
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)
      //state empty
      setUserData({
        email:"",
        password:""
      })
      //navigate

      setTimeout(()=>{navigate('/')},2500)
      
      }
      else{
        toast.error(result.response.data)
      }
     
      }
    }
  return (
    <div style={{width:'100%', height:'100vh'}} className='d-flex justify-content-center align-items-center'>
    <div className="w-75 container">
        <Link className='fs-5' style={{color:'blue', textDecoration:'none'}} to={'/'}><i class="fa-solid fa-arrow-left ms-2"></i>Back to home</Link>
    <div className='card bg-primary p-5 rounded'>
        <div className="row align-items-center">
            <div className='col-lg-6'>
                <img src="http://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png" alt="no image" width={'100%'}/>
            </div>
            <div className='col-lg-6'>
             <div className='d-flex flex-column align-items-center justify-content-center'>
                <h1 className='text-light'><i class="fa-brands fa-stack-overflow fa-2x"></i> Project Fair</h1>
             <h5 className='text-light ms-5 mt-4'>
                {
                    registerForm?"Sign Up to your Account":"Sign In to your account"
                }
             </h5>
             <Form className='mt-5 w-100'>
             {registerForm&& <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
      </Form.Group> }
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter your email id" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Enter your password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} />
      </Form.Group> 
      {registerForm?
        <div className='mt-4'>
            <button onClick={handleRegister} className='btn btn-warning rounded'>Register</button>
         <p className='text-light'>Already a User? Click here to <Link to={'/login'} style={{color:'blue'}}>Login</Link></p>
        </div>:
        <div className='mt-4'>
        <button onClick={handleLogin} className='btn btn-warning rounded'>Login</button>
     <p className='text-light'>New User? Click here to <Link to={'/register'} style={{color:'blue'}}>Register</Link></p>
    </div>
      }    
             </Form>
             </div>
            </div>
        </div>
    </div>
    </div>
    <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </div>
  )
}

export default Auth