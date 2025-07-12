// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdP9Xy4xiz2B-ammJdDXH_fOAi2433Dls",
  authDomain: "my-login-page-1791f.firebaseapp.com",
  projectId: "my-login-page-1791f",
  storageBucket: "my-login-page-1791f.appspot.com",
  messagingSenderId: "223582858737",
  appId: "1:223582858737:web:fa419eb478e55d06cae850",
  measurementId: "G-NL9H31W8TD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };