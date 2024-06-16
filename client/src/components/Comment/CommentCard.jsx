import React from 'react'
import {Link} from 'react-router-dom'
import './CommentCard.css'
import { Typography,Button, Avatar } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useSelector,useDispatch } from 'react-redux'
import { deleteCommentOnPost } from '../../redux/Action/Post'
import { getFollowingPosts, getMyPosts } from '../../redux/Action/User'

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount
}
) => {
    const {user}=useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    const handleCommentDelete=async()=>{
        await dispatch(deleteCommentOnPost(postId,commentId))
        if(isAccount){
            dispatch(getMyPosts())
           }else{
            dispatch(getFollowingPosts())}
          
    }
  return (
    <div className="commentUser">
        <Link to={`/user/${userId}`}>
            <Avatar src={avatar} alt={name} />
            <Typography style={{minWidth:"6vmax"}} >{name}</Typography>
        </Link>
        <Typography>
            {comment}
        </Typography>
        {
            isAccount?<Button onClick={handleCommentDelete}>
            <Delete/>
        </Button>: userId===user._id?<Button onClick={handleCommentDelete}>
            <Delete/>
        </Button>:null
        }

    </div>
  )
}

export default CommentCard