import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';
import api from '../../service/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await axios.post(api.LOGIN, { email, password });
      console.log('Login API Response:', res.data.data);

      const userData = res.data.data.user || res.data.data;
      if (!userData || typeof userData !== 'object') {
        throw new Error('User data not found or invalid in API response');
      }
      localStorage.setItem('token', res.data.data.token || res.data.accessToken);
      
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='deva'>
      <br /><br />
      <h1 style={{ textAlign: 'center' }}>L O G I N</h1><br />
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <input
          className='input'
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          className='input'
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p><Link to='/forgotpassword' className='link'>Forgot password?
        </Link>
        </p>
        <button className='button' type='submit'>Login</button>
        <p style={{fontFamily:'Arial, sans-serif'}}>Don't have an account? <Link to='/' className='link'>Register here
        </Link>
        </p>
      </form>
      

    </div>
  );
};

export default Login;