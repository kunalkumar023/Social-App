import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { resetPassword } from '../../redux/Action/User';
import { clearError, clearMessage } from '../../redux/AuthSlice/Post';
import { Typography, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams();

  const { error, message, loading } = useSelector((state) => state.likeUnlike);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, newPassword));
  };

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearError());
    }

    if (message) {
      toast(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={handleSubmit}>
        <Typography variant="h4">Social Media</Typography>
        <input
          type="password"
          className="resetPasswordInputs"
          id="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Set Password
        </Button>
        <Button component={Link} to="/">
          Login
        </Button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
