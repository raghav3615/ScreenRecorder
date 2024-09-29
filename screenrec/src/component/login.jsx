import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'password') {
      onLogin(true);
    } else {
      setError('Invalid email or password');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleGoogleLogin = () => {
    // Implement Google Login functionality
    alert('Google login triggered');
  };

  return (
    <div className="form-container">
      {/* Separate Dark Mode Button */}
      <button className="dark-mode-toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? '🌞' : '🌙'}
      </button>

      {/* Form Content */}
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* Google Login Button */}
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        <span className="google-emoji">🔑</span> Login with Google
      </button>

      <div className="signup-link">
        <p>
          Don't have an account?{' '}
          <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
