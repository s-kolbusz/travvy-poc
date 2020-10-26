import React from 'react';

type AuthContextType = {
  user?: {
    id: string;
    token: string;
  };
  login: <T>(args: T) => void;
  logout: <T>(args: T) => void;
};

const defaultContext: AuthContextType = {
  user: undefined,
  login: () => {},
  logout: () => {},
};

const AuthContext = React.createContext(defaultContext);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>;
};
