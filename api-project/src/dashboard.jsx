import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      setError('Missing credentials. Please login again.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    fetchUsers(token, currentPage);
  }, [navigate, currentPage]);

  const fetchUsers = async (token, page) => {
    try {
      const response = await axios.get(`${api.GET_ALL_USERS}?pageNumber=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Full API response:', response); 
      console.log('Response data:', response.data); 
      console.log('Users data:', response.data); 
      console.log('Total count:', response.data.totalCount); // Debug: Log total count

      // Handle users data
      const fetchedUsers = Array.isArray(response.data.data) ? response.data.data : response.data.users || response.data || [];
      setUsers(fetchedUsers);
      console.log('Fetched users:', fetchedUsers);
      console.log('Number of users on this page:', fetchedUsers.length); 

      
      const totalCount = response.data.totalCount || response.data.total || response.data.count || response.data.totalUsers || 0;
      console.log('Calculated total count:', totalCount);
      
      
      const finalTotalCount = totalCount > 0 ? totalCount : 596; 
      const calculatedTotalPages = Math.ceil(finalTotalCount / pageSize);
      setTotalPages(calculatedTotalPages);
      console.log('Total pages:', calculatedTotalPages); 
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. You may not be authorized.');
    }
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3>{error}</h3>
      </div>
    );
  }

  if (users.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading users...</div>;
  }

  return (
    <div className='devaraj'>
      <h2 style={{ fontFamily: 'Arial, sans-serif' }}>User Dashboard</h2><br />
      <button onClick={() => navigate('/')}  className='action' style={{ border: '1px solid darkgray' }}>Add User</button><br /><br />
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
        <thead>
          <tr style={{ backgroundColor: '#d90ef0' }}>
            <th style={{ padding: '5px' }}>Name</th>
            <th style={{ padding: '5px' }}>Email</th>
            <th style={{ padding: '5px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id || user.email} style={{ backgroundColor: 'lightblue' }}>
              <td style={{ padding: '5px' }}>{user.name || 'N/A'}</td>
              <td style={{ padding: '5px' }}>{user.email || 'N/A'}</td>
              <td>
                <button className='action' style={{ width: '30%' }}>Edit</button>
                <button className='action' style={{ width: '35%' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;