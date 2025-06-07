import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../service/api';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');


    try {
      await axios.post(api.RESET_PASSWORD(token), {
        password: newPassword,
        confirmPassword: confirmPassword
      });
      setMessage('Password reset successfully! Please log in with your new password.');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError('Failed to reset password: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="deva"><br/><br/>
      <h1>Reset Password</h1><br/>
      <form onSubmit={handleSubmit}>
        <div>
          <lable style={{fontFamily:'Arial'}}><b>Create New Password</b></lable><br/><br/>
          <input
            className='input'
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div>
          <input
            className='input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        <button className='button' type="submit">Reset Password</button>
      </form>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button className='button' onClick={() => navigate('/login')} style={{width:'auto'}}>Back to Login</button>
    </div>
  );
}

export default ResetPassword;