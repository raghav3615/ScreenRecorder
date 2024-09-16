// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };