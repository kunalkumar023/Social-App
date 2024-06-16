import React, { useEffect } from 'react'
import './UpdatePassword.css'
import { Typography,Button } from '@mui/material'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../redux/Action/User'
import { clearError, clearMessage } from '../../redux/AuthSlice/Post'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const dispatch = useDispatch()

    const {loading,error,message}= useSelector((state)=>state.likeUnlike)

    const handlePassword=(e)=>{
        e.preventDefault();
        dispatch(updatePassword(oldPassword,newPassword))
               
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
    <div className='updatePassword'>
        <form className='updatePasswordForm' onSubmit={handlePassword}>

        <Typography variant='h4'>Social Media</Typography>
       
        <input type="password" 
        className="updatePasswordInputs"
        id='password' 
        placeholder='Old Password' 
        required
        value={oldPassword}
        onChange={(e)=>setOldPassword(e.target.value)}/>

        <input type="password" 
        className="updatePasswordInputs"
        id='password' 
        placeholder='New Password' 
        required
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}/>

       

        <Button disabled={loading} type='submit' >Change Password</Button>

        </form>
        <ToastContainer/>
    </div>
  )
}

export default UpdatePassword