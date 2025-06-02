import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api';


function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleFormSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password } = formData;
  console.log('Request Body:', { name, email, password });
  try {
    
    const result = await axios.post(api.REGISTER, { name, email, password });
    console.log("result:", result.data);
    toast.success("Registerd Successfully..");
    const userId = result.data.data.id;
    const token = result.data.data.emailVerificationTOken;
    console.log('User ID:', userId);
    console.log('Verification Token:', token);
    
     setTimeout(() => navigate(`/verifymail?email=${email}&id=${userId}&token=${token}`), 2000)

  } catch (err) {
    console.log('Error Response:', err.response); 
    toast.error(err.response?.data?.message || 'Failed to register. Email may already exist.');
  }
};
  return (
    <div className="deva">
      <br /><br />
      <form onSubmit={handleFormSubmit} style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>R E G I S T E R</h1><br />
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        /><br /><br />

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        /><br /><br />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        /><br /><br />

        <button className="button" type="submit">Register
          
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Register;
