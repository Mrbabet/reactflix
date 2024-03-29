// import {
//   createContext,
//   useCallback,
//   useEffect,
//   useState,
//   browserSessionPersistence,
// } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState({});

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };
// export default AuthContext;
import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser || null);
    });
    return unsubscribe;
  }, [auth]);

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, userSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
