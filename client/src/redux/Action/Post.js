import axios from "axios";
import { addCommentFailure, addCommentRequest, addCommentSuccess, deleteCommentFailure, deleteCommentRequest, deleteCommentSuccess, deletePostFailure, deletePostRequest, deletePostSuccess, likeFailure, likeRequest, likeSuccess, newPostFailure, newPostRequest, newPostSuccess, updateCaptionFailure, updateCaptionRequest, updateCaptionSuccess } from "../AuthSlice/Post";


export const likeUnlike = (postId) => async (dispatch) => {
    try {
      dispatch(likeRequest());
  
      const { data } = await axios.get(`http://localhost:4000/api/v1/post/${postId}`);
  
      dispatch(likeSuccess(data.message));
    } catch (error) {
      dispatch(likeFailure(error.message));
    }
  };


  export const addCommentOnPost = (postId,comment) => async (dispatch) => {
    try {
      dispatch(addCommentRequest());
  
      const { data } = await axios.put(`http://localhost:4000/api/v1/post/comment/${postId}`,{
      comment
      },{
        headers:{
          "Content-Type":"application/json",
        }
      });
      console.log(data);
  
      dispatch(addCommentSuccess(data.message));
    } catch (error) {
      dispatch(addCommentFailure(error.message));
    }
  };


  export const deleteCommentOnPost = (postId, commentId) => async (dispatch) => {
    try {
      dispatch(deleteCommentRequest());
      console.log(commentId);
  
      const { data } = await axios.delete(`http://localhost:4000/api/v1/post/comment/${postId}`, {
        data: { commentId },
      });
  
      dispatch(deleteCommentSuccess(data.message));
    } catch (error) {
      dispatch(deleteCommentFailure(error.message));
    }
  };

  export const createNewPost = (caption,image) => async (dispatch) => {
    try {
      dispatch(newPostRequest());
  
      const { data } = await axios.post(`http://localhost:4000/api/v1/post/upload`,{
      caption,image,
      },{
        headers:{
          "Content-Type":"application/json",
        }
      });
      dispatch(newPostSuccess(data.message));
    } catch (error) {
      dispatch(newPostFailure(error.message));
    }
  };

export const updatePost = (caption,id) => async (dispatch) => {
    try {
      dispatch(updateCaptionRequest());
  
      const { data } = await axios.put(`http://localhost:4000/api/v1/post/${id}`,{
      caption
      },{
        headers:{
          "Content-Type":"application/json",
        }
      });
      
  
      dispatch(updateCaptionSuccess(data.message));
    } catch (error) {
      dispatch(updateCaptionFailure(error.message));
    }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());
    console.log(postId)
    const { data } = await axios.delete(`http://localhost:4000/api/v1/post/${postId}`); 
    dispatch(deletePostSuccess(data.message));
  } catch (error) {
    dispatch(deletePostFailure(error.message));
  }
};