import React, { useEffect,useState } from 'react'
import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getMyPosts, logoutUser } from '../../redux/Action/User'
import Post from '../Post/Post'
import { Avatar, Typography,Button, Dialog } from '@mui/material'
import { clearError, clearMessage } from '../../redux/AuthSlice/Post'
import { Link } from 'react-router-dom'
import User from '../User/User'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {

    const [followerToggle,setFollowerToggle]= useState(false)
    const [followingToggle,setFollowingToggle] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth)
    const {posts} = useSelector((state)=>state.myPosts)
    const {message,error,loading} = useSelector((state)=>state.likeUnlike)
  
    useEffect(()=>{
        dispatch(getMyPosts())
    },[dispatch])

    useEffect(()=>{
        if(error){
          toast.error(error)
          dispatch(clearError())
        }
    
        if(message){
          toast.success(message)
          dispatch(clearMessage())
        }
        dispatch(getMyPosts())
        
    
      },[error,message,dispatch])

      const handleLogout=async()=>{
        await dispatch(logoutUser())
        toast.success("Logout Successfull")
        navigate('/')
      }

      const handleDeleteProfile=async()=>{
        await dispatch(deleteProfile());
        dispatch(logoutUser())
      }
  return (
    <div className='account'>
      
        <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes} 
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isDelete={true}
              isAccount={true}
            />
          ))
        ) : (
          <Typography>No post found</Typography>
        )}
        </div>
        <div className="accountright">
            <Avatar src={user.avatar.url} alt="User" sx={{height:"10vmax",width:"10vmax"}} />
            <Typography varient='h5'>{user.name}</Typography>
            <div>
                <button onClick={()=>setFollowerToggle(!followerToggle)}>
                    <Typography>Followers</Typography>
                </button>
                <Typography>{user.followers.length}</Typography>
            </div>

            <div>
                <button onClick={()=>setFollowingToggle(!followingToggle)}>
                    <Typography>Following</Typography>
                </button>
                <Typography>{user.following.length}</Typography>
            </div>

            <div>
                <button>
                    <Typography>Posts</Typography>
                </button>
                <Typography>{user.posts.length}</Typography>
            </div>

            <Button varient="contained" onClick={handleLogout}>Logout</Button>

            <Link to="/update/profile" >Update Profile</Link>
            <Link to="/update/password">Change Password</Link>

            <Button varient="text" onClick={handleDeleteProfile} disabled={loading}
            style={{color:'red',margin:'2vmax'}}>
                Delete My Account
            </Button>
        </div>
        <Dialog
        open={followerToggle}
        onClose={()=>setFollowerToggle(!followerToggle)} >
          <div className="dialogBox">
          <Typography>Followed By</Typography>
          {user && user.followers.length>0?
            user.followers.map(follower=>(
              <User 
        key={follower._id}
              userId={follower._id}
              name={follower.name}
              avatar={follower.avatar.url}
              />
            )):
            <Typography>No one follows you..</Typography>
        }
          </div>
          
        </Dialog>
        <Dialog
        open={followingToggle}
        onClose={()=>setFollowingToggle(!followingToggle)} >
        <div className="dialogBox">
          <Typography>Following</Typography>
          {user && user.following.length>0?
            user.following.map(follow=>(
              <User 
        key={follow._id}
              userId={follow._id}
              name={follow.name}
              avatar={follow.avatar.url}
              />
            )):
            <Typography>You don't followe anyone..</Typography>
        }
          </div>
          </Dialog>
          <ToastContainer/>
    </div>
  )
}

export default Account