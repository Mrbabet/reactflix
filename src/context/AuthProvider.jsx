import { createContext, useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, [auth]);


const signUp = async(email,password)=>{
  try {
    await createUserWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.error(error.message)
  }
}

const signIn = async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth, email,password)
  } catch (error) {
    console.error(error.message)
  }
}

const userSignOut = async () =>{
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error.message)
  }
}

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, userSignOut }}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
