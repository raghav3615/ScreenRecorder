import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { auth, googleProvider } from '../firebase';// Import Firebase config
import { signInWithPopup } from 'firebase/auth';

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
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Handle successful login, e.g., redirect the user
        console.log('User signed in with Google:', result.user);
        onLogin(true); // Call the onLogin prop to update state in the parent
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
        setError('Google Sign-In failed. Please try again.');
      });
  };

  return (
    <div className="form-container">
      {/* Dark Mode Button */}
      <button className="dark-mode-toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? '🌞' : '🌙'}
      </button>

      {/* Form Content */}
      <h2>Login</h2>
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

      {/* OR Separator */}
      <div className="or-separator">
        <span>or</span>
      </div>

      {/* Google Login Button */}
      <div className="google-button-container">
        <GoogleButton onClick={handleGoogleLogin} />
      </div>

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
