// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Correct imports for auth
import { getAnalytics } from "firebase/analytics"; // Optional: Import analytics if you need it

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCQk-wxDsqRFnx2Seq0rvzDnmqZCXVYyro",
  authDomain: "screen-recorder-15d8c.firebaseapp.com",
  projectId: "screen-recorder-15d8c",
  storageBucket: "screen-recorder-15d8c.appspot.com",
  messagingSenderId: "15436247862",
  appId: "1:15436247862:web:a881d54579ffa96925b997",
  measurementId: "G-YLSFCB5V8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Firebase Analytics if you're using it
if (typeof window !== "undefined") {
  getAnalytics(app);
}

// Initialize Firebase Auth and Google Auth Provider
export const auth = getAuth(app); // Export the initialized auth instance
export const googleProvider = new GoogleAuthProvider(); // Export the Google Auth provider
