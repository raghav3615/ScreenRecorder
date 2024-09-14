import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScreenRecorder from './component/ScreenRecorder';
import Login from './component/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/recorder" /> : <Login />} />
        <Route path="/recorder" element={isLoggedIn ? <ScreenRecorder /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
