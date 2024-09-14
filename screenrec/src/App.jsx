import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScreenRecorder from './component/ScreenRecorder';
import Login from './component/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login state change
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        {/* If the user is logged in, navigate to the screen recorder */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/recorder" /> : <Login onLogin={handleLogin} />} />
        
        {/* Screen recorder page */}
        <Route path="/recorder" element={isLoggedIn ? <ScreenRecorder /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
