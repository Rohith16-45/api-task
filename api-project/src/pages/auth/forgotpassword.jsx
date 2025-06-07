import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../service/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post(api.FORGOT_PASSWORD, { email });
      setMessage('A password reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset link: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="deva"><br/><br/>
      <h1>Forgot Password</h1><br/>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className='input'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button className='button' type="submit">Send Reset Link</button>
      </form>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={() => navigate('/login')} className='button' style={{width:'auto'}}>Back to Login</button>
    </div>
  );
}

export default ForgotPassword;