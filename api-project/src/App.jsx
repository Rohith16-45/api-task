// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './service/App.css';
import AppRoutes from './Router/privaterouter';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
