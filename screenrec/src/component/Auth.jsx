// src/components/Auth.js
import React, { useState } from 'react';
import { auth, provider, signInWithPopup, signOut } from '../firebase'; // import firebase config and functions

const Auth = () => {
  const [user, setUser] = useState(null);

  // Function to handle Google Sign-in
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set the signed-in user
      console.log(result.user); // You can check user details in the console
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user on sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="auth-container">
      {!user ? (
        <button className="auth-btn" onClick={handleLogin}>
          Sign in with Google
        </button>
      ) : (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          <img src={user.photoURL} alt="Profile" width="50px" />
          <button className="auth-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
