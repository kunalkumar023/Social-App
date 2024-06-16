import { createSlice } from "@reduxjs/toolkit";

const likeUnlikeSlice = createSlice({
    name:"like",
    initialState:{},
    reducers:{
        likeRequest(state){
            state.loading=true
        },
        likeSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        likeFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        addCommentRequest(state){
            state.loading=true
        },
        addCommentSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        addCommentFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        deleteCommentRequest(state){
            state.loading=true
        },
        deleteCommentSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        deleteCommentFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        newPostRequest(state){
            state.loading=true
        },
        newPostSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        newPostFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        updateCaptionRequest(state){
            state.loading=true
        },
        updateCaptionSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        updateCaptionFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        deletePostRequest(state){
            state.loading=true
        },
        deletePostSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        deletePostFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        updateProfileRequest(state){
            state.loading=true
        },
        updateProfileSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        updateProfileFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        updatePasswordRequest(state){
            state.loading=true
        },
        updatePasswordSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        updatePasswordFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
         deleteProfileRequest(state){
            state.loading=true
        },
        deleteProfileSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        deleteProfileFailure(state,action){
            state.loading=false;
            state.error=action.payload
        },
        forgotPasswordRequest(state){
            state.loading=true
        },
        forgotPasswordSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        forgotPasswordFailure(state,action){
            state.loading=false;
            state.error=action.payload
        },
        resetPasswordRequest(state){
            state.loading=true
        },
        resetPasswordSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        resetPasswordFailure(state,action){
            state.loading=false;
            state.error=action.payload
        },
        followUserRequest(state){
            state.loading=true
        },
        followUserSuccess(state,action){
            state.loading=false;
            state.message=action.payload
        },
        followUserFailure(state,action){
            state.loading=false;
            state.error=action.payload
        },
        clearError(state){
            state.error=null
        },
        clearMessage(state){
            state.message=null
        }
    }
})
export const{
    likeFailure,
    likeSuccess,
    likeRequest,
    addCommentFailure,
    addCommentSuccess,
    addCommentRequest,
    deleteCommentFailure,
    deleteCommentRequest,
    deleteCommentSuccess,
    newPostFailure,
    newPostSuccess,
    newPostRequest,
    updateCaptionFailure,
    updateCaptionSuccess,
    updateCaptionRequest,
    deletePostFailure,
    deletePostSuccess,
    deletePostRequest,
    updateProfileFailure,
    updateProfileSuccess,
    updateProfileRequest,
    updatePasswordRequest,
    updatePasswordFailure,
    updatePasswordSuccess,
    deleteProfileRequest,
    deleteProfileFailure,
    deleteProfileSuccess,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    followUserFailure,
    followUserRequest,
    followUserSuccess,
    clearError,
    clearMessage
} = likeUnlikeSlice.actions

const myPostSlice = createSlice({
    name:"myPost",
    initialState:{},
    reducers:{
        myPostRequest(state){
            state.loading=true
        },
        myPostSuccess(state,action){
            state.loading=false;
            state.posts=action.payload
        },
        myPostFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        clearError(state){
            state.error=null
        },
        clearMessage(state){
            state.message=null
        }

    }
})

export const{
    myPostFailure,
    myPostRequest,
    myPostSuccess,
    clearError:myPostClearError,
    clearMessage:myPostClearMessage,
}= myPostSlice.actions

const userPostSlice = createSlice({
    name:"userPost",
    initialState:{},
    reducers:{
        userPostRequest(state){
            state.loading=true
        },
        userPostSuccess(state,action){
            state.loading=false;
            state.posts=action.payload
        },
        userPostFailure(state,action){
            state.lading=false;
            state.error=action.payload
        },
        clearError(state){
            state.error=null
        },
        clearMessage(state){
            state.message=null
        }

    }
})

export const{
    userPostFailure,
    userPostSuccess,
    userPostRequest,
    clearMessage:userPostClearMessage
} = userPostSlice.actions

export const myPostReducer= myPostSlice.reducer
export const userPostReducer = userPostSlice.reducer
export default likeUnlikeSlice.reducer