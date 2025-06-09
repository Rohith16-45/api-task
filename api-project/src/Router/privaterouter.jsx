import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import EmailVerification from '../pages/auth/verifymail';
import Dashboard from '../users/dashboard';
import UserDetail from '../pages/auth/userdetail';
import ForgotPassword from '../pages/auth/forgotpassword';
import ResetPassword from '../pages/auth/reset-password';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/verifymail' element={<EmailVerification />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/userdetail/:id' element={<UserDetail />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/*' element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
