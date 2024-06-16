import React, { useEffect } from 'react'
import './Login.css'
import { Typography,Button } from '@mui/material'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/Action/User'
import {clearMessage } from '../../redux/AuthSlice/Post'
import { clearErrors } from '../../redux/AuthSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()

    const {error}=useSelector((state)=>state.auth)
    const {message}=useSelector((state)=>state.likeUnlike)

    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password))        
    }

    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch(clearErrors())
      }

      if(message){
        toast.success(message)
        dispatch(clearMessage())
      }
    },[dispatch,error,message])

  return (
    <div className='login'>
        <form className='loginForm' >

        <Typography variant='h4'>Social Media</Typography>
        <input type="email"
        id="email"
        placeholder='Email' 
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" 
        id='password' 
        placeholder='Password' 
        required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <Link to="/forgot/password" >
        <Typography>Forgot Password</Typography>
        </Link>

        <Button type='submit' onClick={handleLogin}>Login</Button>

        <Link to="/register" > <Typography>New User?</Typography></Link>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login