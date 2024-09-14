import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      alert('Signup Successful');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="form-container">
      {/* Dark Mode Button */}
      <button className="dark-mode-toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? '🌞' : '🌙'}
      </button>

      {/* Form Content */}
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>

      {/* Already Have an Account? Link */}
      <div className="signup-link">
        <p>
          Already have an account?{' '}
          <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
