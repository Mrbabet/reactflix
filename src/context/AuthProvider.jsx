import {
  createContext,
  useCallback,
  useEffect,
  useState,
  browserSessionPersistence,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
