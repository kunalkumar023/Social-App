import { configureStore } from "@reduxjs/toolkit";
import authReducer, { allUserReducer, postOfFollowingReducer, userProfileReducer } from "../AuthSlice";
import likeUnlikeReducer, { myPostReducer, userPostReducer } from '../AuthSlice/Post.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postOfFollowingReducer,
    allUsers:allUserReducer,
    likeUnlike:likeUnlikeReducer,
    myPosts:myPostReducer,
    userProfile:userProfileReducer,
    userPost:userPostReducer
  },
});

export default store;
