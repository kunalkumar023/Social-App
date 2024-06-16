import React, { useEffect, useState } from 'react'
import './register.css'
import { Typography,Avatar,Button } from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/Action/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [avatar,setAvatar]=useState(null)
    const [password,setPassword]=useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading,error,message}= useSelector((state)=>state.auth)

    const handleSubmit=async(e)=>{
        e.preventDefault();
        dispatch(registerUser(avatar,name,email,password))
        navigate("/")
    
        
    }

    const handleImageChange=(e)=>{
     
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file)

        Reader.onload=()=>{
    
            if(Reader.readyState===2){
             
                setAvatar(Reader.result)
            }
        }
    }

    useEffect(()=>{
        if(error){
            toast(error)
        }
        
        if(message){
            toast(message)
        }
    },[message,error])

  return (
   <div className="register">
    <form className="registerForm" onSubmit={handleSubmit}>
        <Typography variant='h3' style={{padding:"2vmax"}}>Social App</Typography>

        <Avatar
        src={avatar}
        alt="User"
        sx={{height:"10vmax",width:"10vmax"}}
        />

        <input type="file" accept='image/*' onChange={handleImageChange}/>

        <input type="text"
        placeholder='Name' 
        className='registerInputs'
        required
        value={name}
        onChange={(e)=>setName(e.target.value)}/>

        <input type="email"
        placeholder='Email' 
        className='registerInputs'
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>


        <input type="password" 
        placeholder='Password'
        className='registerInputs' 
        required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

        <Link to="/"><Typography>Already signed up? Login</Typography></Link>

        <Button disabled={loading} type='submit'>Sign Up</Button>
    </form>
    <ToastContainer/>
   </div>
  )
}

export default Register