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

// const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const registerWithEmailAndPassword = async (email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     console.log(res);
//     const user = res.user;
//     console.log(user);
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const logout = () => {
//   signOut(auth);
// };
