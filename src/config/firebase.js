// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0ATeeXzFZobSRxM3LAvd3ukcBerNZDwk",
  authDomain: "reactflix-1e52a.firebaseapp.com",
  projectId: "reactflix-1e52a",
  storageBucket: "reactflix-1e52a.appspot.com",
  messagingSenderId: "825458614990",
  appId: "1:825458614990:web:6f97920218aa3faa25a69f",
  measurementId: "G-XXSQJB0HMF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export default app;
