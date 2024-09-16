import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScreenRecorder from './component/ScreenRecorder';
import Login from './component/login';
import Signup from './component/Signup'; 

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root / to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login page route */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/recorder" /> : <Login onLogin={handleLogin} />} 
        />

        {/* ScreenRecorder route, protected by login check */}
        <Route 
          path="/recorder" 
          element={isLoggedIn ? <ScreenRecorder /> : <Navigate to="/login" />} 
        />

        {/* Signup page route */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
