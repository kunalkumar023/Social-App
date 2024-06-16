import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import { Avatar, Typography, Button, Dialog } from '@mui/material'
import { clearError, clearMessage } from '../../redux/AuthSlice/Post'
import { useParams } from 'react-router-dom'
import { followUnfollowUser, getUserPosts, getUserProfile } from '../../redux/Action/User'
import User from '../User/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {

    const [followerToggle, setFollowerToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [followingUser, setFollowingUser] = useState(false)
    const [myProfile, setMyProfile] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()

    const { user } = useSelector((state) => state.userProfile)
    const { user: me } = useSelector((state) => state.auth)
    const { posts, error: userError } = useSelector((state) => state.userPost)
    const { message, error, loading } = useSelector((state) => state.likeUnlike)

    useEffect(() => {
        dispatch(getUserPosts(params.id))
        dispatch(getUserProfile(params.id))
        if (me._id === params.id) {
            setMyProfile(true)
        }
    }, [dispatch, me._id, params.id])

    useEffect(() => {
        console.log(user.followers)
        user && user.followers.forEach(item => {
            console.log(item._id,me._id)
            if (item._id === me._id) {
                setFollowingUser(true)
                
            }
        })
    }, [me._id, user])

    const handleFollow = async() => {
        setFollowingUser(!followingUser)
        dispatch(followUnfollowUser(params.id))
        dispatch(getUserProfile(params.id))
        // dispatch(getUserProfile(params.id))
    }

    useEffect(() => {
        if (message) {
            toast.success(message)
            dispatch(clearMessage())
        }

        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        if (userError) {
            toast.error(userError)
            dispatch(clearError())
        }
        dispatch(getUserPosts(params.id))
    }, [message, error, userError, params.id, dispatch])

    return (
        <div className='account'>
            <div className="accountleft">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image?.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner?.avatar?.url}
                            ownerName={post.owner?.name}
                            ownerId={post.owner?._id}
                        />
                    ))
                ) : (
                    <Typography>User Doesn't create any post</Typography>
                )}
            </div>
            <div className="accountright">
                {user && (
                    <>
                        <Avatar src={user.avatar?.url} alt="User" sx={{ height: "10vmax", width: "10vmax" }} />
                        <Typography varient='h5'>{user.name}</Typography>
                        <div>
                            <button onClick={() => setFollowerToggle(!followerToggle)}>
                                <Typography>Followers</Typography>
                            </button>
                            <Typography>{user.followers.length}</Typography>
                        </div>
                        <div>
                            <button onClick={() => setFollowingToggle(!followingToggle)}>
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
                        {!myProfile && (
                            <Button
                                disabled={loading}
                                variant="contained"
                                onClick={handleFollow}
                                style={{ background: followingUser ? "blue" : "red" }}
                            >
                                {followingUser ? "Unfollow" : "Follow"}
                            </Button>
                        )}
                    </>
                )}
            </div>
            <Dialog
                open={followerToggle}
                onClose={() => setFollowerToggle(!followerToggle)}
            >
                <div className="dialogBox">
                    <Typography>Followed By</Typography>
                    {user && user.followers.length > 0 ?
                        user.followers.map(follower => (
                            <User
                                key={follower._id}
                                userId={follower._id}
                                name={follower.name}
                                avatar={follower.avatar?.url}
                            />
                        )) :
                        <Typography>No one follows you..</Typography>
                    }
                </div>
            </Dialog>
            <Dialog
                open={followingToggle}
                onClose={() => setFollowingToggle(!followingToggle)}
            >
                <div className="dialogBox">
                    <Typography>Following</Typography>
                    {user && user.following.length > 0 ?
                        user.following.map(follow => (
                            <User
                                key={follow._id}
                                userId={follow._id}
                                name={follow.name}
                                avatar={follow.avatar?.url}
                            />
                        )) :
                        <Typography>You don't follow anyone..</Typography>
                    }
                </div>
            </Dialog>
            <ToastContainer/>
        </div>
    )
}

export default UserProfile
