import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Typography} from '@mui/material'
import { forgotPassword } from '../../redux/Action/User'
import './ForgetPassword.css'
import { clearError, clearMessage } from '../../redux/AuthSlice/Post'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword=()=>{
    const [email,setEmail]=useState("")
    const dispatch = useDispatch()

    const {error,message,loading} = useSelector((state)=>state.likeUnlike)


    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email))
    }


    useEffect(()=>{
        if(error){
          toast(error)
          dispatch(clearError())
        }
  
        if(message){
          toast(message)
          dispatch(clearMessage())
        }
      },[dispatch,error,message])

   

  return (
    <div className='forgotPassword'>
        <form className='forgotPasswordForm' >

        <Typography variant='h4'>Social Media</Typography>
        <input type="email"
        className='forgotPasswordInputs'
        id="email"
        placeholder='Email' 
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
        

        <Button disabled={loading} type='submit' onClick={handleSubmit}>Send Token</Button>

        </form>
        <ToastContainer/>
    </div>
  )
}

export default ForgotPassword