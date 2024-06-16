import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './components/Header/Header.jsx';
import Login from './components/Login/Login.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './redux/Action/User.js';
import Home from './components/Home/Home.jsx';
import Account from './components/Account/Account.jsx';
import NewPost from './components/NewPost/NewPost.jsx';
import Register from './components/Register/Register.jsx';
import UpdateProfile from './components/UpdateProfile/UpdateProfile.jsx';
import UpdatePassword from './components/UpdatePassword/UpdatePassword.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'
import UserProfile from './components/UserProfile/UserProfile.jsx';
import Search from './components/Search/Search.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])

  const {isAuthenticated}= useSelector((state)=>state.auth)
  return (
    <BrowserRouter>
    {isAuthenticated && <Header/>}
    <Routes>
      <Route path="/"  element={isAuthenticated ? <Home/>:<Login/>} />
      <Route path='/account' element={isAuthenticated?<Account/>:<Login/>}/>
      <Route path='/newpost' element={isAuthenticated?<NewPost/>:<Login/>}/>
      <Route path='/register' element={isAuthenticated?<Account/>:<Register/>}/>
      <Route path='/update/profile' element={isAuthenticated?<UpdateProfile/>:<Login/>}/>
      <Route path='/update/password' element={isAuthenticated?<UpdatePassword/>:<Login/>}/>
      <Route path='/forgot/password' element={isAuthenticated?<UpdatePassword/>:<ForgotPassword/>}/>
      <Route path='/password/reset/:token' element={isAuthenticated?<UpdatePassword/>:<ResetPassword/>}/>
      <Route path='/user/:id' element={isAuthenticated?<UserProfile/>:<Login/>}/>
      <Route path='/search' element={isAuthenticated?<Search/>:<Login/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
