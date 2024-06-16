import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null, 
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    loadUserRequest(state) {
      state.loading = true;
      state.error = null; 
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null; // Clear any previous errors
    },
    loadUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Store error message
      state.isAuthenticated = false;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Store error message
      state.isAuthenticated = true;
    },
    registerRequest(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    registerSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Store error message
      state.isAuthenticated = true;
    },
    clearErrors(state) {
      state.error = null; // Clear errors
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registerRequest,
  registerFailure,
  registerSuccess,
  clearErrors
} = authSlice.actions;

const postOfFollowingSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    postOfFollowingRequest(state) {
      state.loading = true;
    },
    postOfFollowingSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    postOfFollowingFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    }
  }
});

export const {
  postOfFollowingFailure,
  postOfFollowingRequest,
  postOfFollowingSuccess,
  clearErrors: clearPostErrors
} = postOfFollowingSlice.actions;

const allUserSlice = createSlice({
  name:'allUsers',
  initialState:{},
  reducers:{
    allUsersRequest(state) {
      state.loading = true;
    },
    allUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    }
  }
})

export const{
  allUsersFailure,
  allUsersRequest,
  allUsersSuccess
} = allUserSlice.actions

const userProfileSlice = createSlice({
  name:'userProfile',
  initialState:{},
  reducers:{
    userProfileRequest(state) {
      state.loading = true;
    },
    userProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    userProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    }
  }
})

export const {
  userProfileFailure,
  userProfileRequest,
  userProfileSuccess,
  clearErrors:userProfileError
}= userProfileSlice.actions

export default authSlice.reducer;
export const postOfFollowingReducer = postOfFollowingSlice.reducer;
export const allUserReducer= allUserSlice.reducer;
export const userProfileReducer = userProfileSlice.reducer
