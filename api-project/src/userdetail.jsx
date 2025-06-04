import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from './api';

function UserDetail() {
  const { id } = useParams();
  console.log('User ID from params:', id);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.user) {
      setUser({
        name: location.state.user.name || '',
        email: location.state.user.email || '',
        password: '' // Don't prefill password
      });
      setLoading(false);
    } else {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${api.GET_USER_BY_ID}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Adjust this if your API returns user in a nested object
      const data = response.data.data || response.data.user || response.data;
      setUser({
        name: data.name || '',
        email: data.email || '',
        password: ''
      });
    } catch (err) {
      setError('Failed to fetch user.,',err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setError('');
    try {
      // Only send password if it's not empty
      const updateData = { name: user.name, email: user.email };
      if (user.password) updateData.password = user.password;
     await axios.get(`${api.GET_USER_BY_ID}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      alert('User updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update user.',err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    setError('');
    try {
      await axios.delete(`${api.DELETE_USER}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('User deleted successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete user.',err);
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className='deva'>
      <h1>User Details</h1><br/><br/><br/>
      <table border="2px solid black" style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
        <thead>
          <tr>
            <th>Name</th>
            <td>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <th>Password</th>
            <td>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                style={{ width: '100%' }}
                placeholder="Leave blank to keep unchanged"
              />
            </td>
          </tr>
        </thead>
      </table>

      <br />
      <button className='action' onClick={handleUpdate}>Save</button>
      <button className='action' style={{ marginLeft: '10px' }} onClick={handleDelete}>Delete</button>
      <button className='action' style={{ marginLeft: '10px' }} onClick={() => navigate('/dashboard')}>Back</button>
    </div>
  );
}

export default UserDetail;