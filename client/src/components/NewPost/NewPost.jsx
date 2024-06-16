import React, { useEffect, useState } from 'react'
import './NewPost.css'
import { Button, Typography } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import { createNewPost } from '../../redux/Action/Post'
import { clearError, clearMessage } from '../../redux/AuthSlice/Post'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPost = () => {
    const [image,setImage]=useState(null)
    const [caption,setCaption] =useState("")

    const {loading,error,message} = useSelector((state)=>state.likeUnlike)
    const dispatch = useDispatch()

    const handleImageChange=(e)=>{
     
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file)

        Reader.onload=()=>{
    
            if(Reader.readyState===2){
             
                setImage(Reader.result)
            }
        }
    }

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(createNewPost(caption,image))
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
    
      },[error,message,dispatch])

  return (
    <div className="newPost">
        <form className='newPostForm' onSubmit={submitHandler}>
        <Typography variant='h3'>New Post</Typography>
        {image && <img src={image} alt="post"/>}
        <input type="file" accept='image/*' onChange={handleImageChange}/>
        <input type="text"  placeholder='Caption....' value={caption} onChange={(e)=>setCaption(e.target.value)}/>
        <Button disabled={loading} type="submit">Post</Button>
        </form>
        <ToastContainer/>

    </div>
  )
}

export default NewPost