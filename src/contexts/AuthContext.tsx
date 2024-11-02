import { useState, createContext, useContext } from 'react';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [value, setValue] = useState({ isLoggedIn: false, token: null });
  return (
    <AuthContext.Provider value={{ value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
