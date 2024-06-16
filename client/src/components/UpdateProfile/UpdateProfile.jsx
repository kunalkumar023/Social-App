import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import { Typography, Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../redux/Action/User';
import { clearError, clearMessage } from '../../redux/AuthSlice/Post';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const { error, message, user } = useSelector((state) => state.auth);
    const { loading: updateLoading, error: updateError, message: updateMessage } = useSelector((state) => state.likeUnlike);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(null);
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
        navigate("/account");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result);
            }
        };
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearError());
        }
        if (updateMessage) {
            toast.success(updateMessage);
            dispatch(clearMessage());
        }
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [dispatch, error, updateError, updateMessage, message]);

    return (
        <div className="register">
            <form className="registerForm" onSubmit={handleSubmit}>
                <Typography variant='h3' style={{ padding: "2vmax" }}>Social App</Typography>
                <Avatar
                    src={avatarPrev}
                    alt="User"
                    sx={{ height: "10vmax", width: "10vmax" }}
                />
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <input type="text"
                    placeholder='Name'
                    className='registerInputs'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input type="email"
                    placeholder='Email'
                    className='registerInputs'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <Button disabled={updateLoading} type='submit'>Update</Button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProfile;
