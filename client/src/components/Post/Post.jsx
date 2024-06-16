import React, { useEffect, useState } from 'react';
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from '@mui/icons-material';
import { Typography, Button, Dialog } from '@mui/material';
import './Post.css';
import User from '../User/User.jsx';
import CommentCard from '../Comment/CommentCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentOnPost,
  deletePost,
  likeUnlike,
  updatePost,
} from '../../redux/Action/Post.js';
import { getFollowingPosts, getMyPosts } from '../../redux/Action/User.js';

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete,
  isAccount,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [deletePostToggle, setDeletePostToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likeUnlike(postId));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
  };

  const handleCapitonUpdate = async (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  useEffect(() => {
    if (user) {
      likes.forEach((item) => {
        if (item._id === user._id) {
          setLiked(true);
        }
      });
    }
  }, [likes, user]);

  return (
    <div className="post">
      <div className="postHeader"></div>
      {isAccount ? (
        <Button
          onClick={() => setCaptionToggle(!captionToggle)}
          style={{ color: 'black', display: 'flex', alignSelf: 'flex-end' }}
        >
          <MoreVert />
        </Button>
      ) : null}
      <img src={postImage} alt="img" />
      <div className="postDetails">
        <User key={ownerId} userId={ownerId} name={ownerName} avatar={ownerImage} />
        <Typography
          fontSize={15}
          padding={1}
          fontWeight={100}
          color="rgba(0,0,0,1)"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: 'none',
          background: 'white',
          cursor: 'pointer',
          margin: '1vmax 2vmax',
        }}
        onClick={() => setLikesUser(!likesUser)}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        <Button onClick={() => setDeletePostToggle(!deletePostToggle)}>
          {isDelete ? <DeleteOutline /> : null}
        </Button>
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="dialogBox">
          <Typography>Liked By</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
        <div className="dialogBox">
          <Typography>Comments</Typography>
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment here.."
              required
            />
            <Button type="submit">Add comment</Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No Comment Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
        <div className="dialogBox">
          <Typography>Update</Typography>
          <form onSubmit={handleCapitonUpdate}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
            />
            <button type="submit">update</button>
          </form>
        </div>
      </Dialog>

      <Dialog
        open={deletePostToggle}
        onClose={() => setDeletePostToggle(!deletePostToggle)}
      >
        <div className="dialogBox">
          <Typography>Are you sure to delete this post?</Typography>
          <button type="submit" onClick={handleDeletePost}>
            Yes
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
