import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import api from './api';

function EmailVerification() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const userEmail = query.get('email');
  const userId = query.get('id');
  const userToken = query.get('token');
  console.log('Query Parameters:', { userEmail, userId, userToken });
  

  
  if (!userEmail || !userId || !userToken) {
    setMsg('Invalid verification link.');
    toast.error('Invalid verification link.');
    setTimeout(() => navigate('/'), 2000);
    return null;
  }

  const verifyNow = async () => {
    setMsg('Verifying your email...');

    try {
      const response = await axios.get(`${api.VERIFICATION}?token=${userToken}&userId=${userId}`);

      console.log('Verification Success:', response.data);
      setMsg('Email verified!');
      toast.success('Email verified successfully!');

      const storedData = JSON.parse(localStorage.getItem('userData'));
      console.log(storedData);

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Verification Error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setMsg('Verification failed. Try signing up again.');
      toast.error(err.response?.data?.message || 'Verification failed.');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="deva">
      <br /><br />
      <h1 style={{ textAlign: 'center' }}>V E R I F Y</h1>
      <br />
      <div>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={userEmail || ''}
          disabled
        />
      </div>
      <button className="button" onClick={verifyNow}>
        Verify Now
      </button>
      {msg && (
        <p className={msg.includes('failed') ? 'error' : 'success'}>
          {msg}
        </p>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default EmailVerification;