import React, { useEffect } from 'react';
import './Home.css';
import User from '../User/User.jsx';
import Post from '../Post/Post.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFollowingPosts, loadUser } from '../../redux/Action/User.js';
import Loader from '../Loader/Loader.jsx';
import { Typography } from '@mui/material';
import { clearError, clearMessage } from '../../redux/AuthSlice/Post.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => state.posts);
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);
  const { error: likeError, message } = useSelector((state) => state.likeUnlike);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (likeError) {
      toast.error(likeError); 
      dispatch(clearError());
    }

    if (message) {
      toast.success(message);  
      dispatch(clearMessage());
    }
  }, [likeError, message, dispatch]);

  return (
    <>
      {(loading || usersLoading) && <Loader />}
      {!loading && !usersLoading && (
        <div className="home">
          <div className="homeleft">
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
                />
              ))
            ) : (
              <Typography>No post found</Typography>
            )}
          </div>
          
          <div className="homeright">
            {users && users.length > 0 ? (
              users.map((user) => (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar ? user.avatar.url : 'default-avatar-url'}
                />
              ))
            ) : (
              <Typography>No user yet..</Typography>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Home;
