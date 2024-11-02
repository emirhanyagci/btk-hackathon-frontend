import { useState, createContext, useContext } from 'react';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [value, setValue] = useState<any>({ isLoggedIn: false, token: null });
  return (
    <AuthContext.Provider value={{ value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext<any>(AuthContext);
  return context;
};
