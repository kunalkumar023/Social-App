import axios from 'axios';
import { loginRequest, loginFailure, loginSuccess, loadUserRequest, loadUserSuccess, loadUserFailure, postOfFollowingRequest, postOfFollowingSuccess, postOfFollowingFailure, allUsersRequest, allUsersSuccess, allUsersFailure, logoutRequest, logoutSuccess, logoutFailure, registerRequest, registerSuccess, registerFailure, userProfileRequest, userProfileSuccess, userProfileFailure } from '../AuthSlice';
import { deleteProfileFailure, deleteProfileRequest, deleteProfileSuccess, followUserFailure, followUserRequest, followUserSuccess, forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess, myPostFailure, myPostRequest, myPostSuccess, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess, updatePasswordFailure, updatePasswordSuccess, updateProfileFailure, updateProfileRequest, updateProfileSuccess, userPostFailure, userPostRequest, userPostSuccess } from '../AuthSlice/Post';

axios.defaults.withCredentials = true;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(
      "http://localhost:4000/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    // dispatch(loginSuccess(response.data.isUser));
    if (response.data.success) {
      dispatch(loginSuccess(response.data.user));
    } else {
      dispatch(loginFailure(response.data.message));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const response = await axios.get("http://localhost:4000/api/v1/me");

    dispatch(loadUserSuccess(response.data.user));
  } catch (error) {
    dispatch(loadUserFailure(error.message));
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch(postOfFollowingRequest());

    const { data } = await axios.get('http://localhost:4000/api/v1/posts');

    dispatch(postOfFollowingSuccess(data.posts));
  } catch (error) {
    dispatch(postOfFollowingFailure(error.message));
  }
};


export const getAllUsers = (name="") => async (dispatch) => {
  try {
    dispatch(allUsersRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/alluser?name=${name}`);

    dispatch(allUsersSuccess(data.allUser));
  } catch (error) {
    dispatch(allUsersFailure(error.message));
  }
};


export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch(myPostRequest());

    const { data } = await axios.get('http://localhost:4000/api/v1/my/posts');

    dispatch(myPostSuccess(data.posts));
  } catch (error) {
    dispatch(myPostFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await axios.get("http://localhost:4000/api/v1/logout");

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};

export const registerUser = (avatar,name,email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const response = await axios.post(
      "http://localhost:4000/api/v1/register",
      { avatar,name,email, password},
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    // console.log(response.data.isUser)

    dispatch(registerSuccess(response.data.isUser));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};


export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const response = await axios.put(
      "http://localhost:4000/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    dispatch(updateProfileSuccess(response.data.message));
  } catch (error) {
    dispatch(updateProfileFailure(error.response.data.message));
  }
};

export const updatePassword = (oldPassword,newPassword) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const response = await axios.put(
      "http://localhost:4000/api/v1/update/password",
      { oldPassword,newPassword},
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    dispatch(updatePasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(updatePasswordFailure(error.response.data.message));
  }
};

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch(deleteProfileRequest());

    const { data } = await axios.delete("http://localhost:4000/api/v1/delete/me", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteProfileSuccess(data.message));
  } catch (error) {
    dispatch(deleteProfileFailure(error.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const { data } = await axios.post("http://localhost:4000/api/v1/forgot/password",{email}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFailure(error.message));
  }
};

export const resetPassword = (token,password) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`,{token,password}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch(userPostRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/userposts/${id}`);

    dispatch(userPostSuccess(data.posts));
  } catch (error) {
    dispatch(userPostFailure(error.message));
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(userProfileRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/user/${id}`);

    dispatch(userProfileSuccess(data.user));
  } catch (error) {
    dispatch(userProfileFailure(error.message));
  }
};

export const followUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch(followUserRequest());

    const { data } = await axios.get(`http://localhost:4000/api/v1/follow/${id}`);

    dispatch(followUserSuccess(data.message));
  } catch (error) {
    dispatch(followUserFailure(error.message));
  }
};