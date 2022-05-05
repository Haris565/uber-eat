import { Auth } from 'aws-amplify';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  console.log(authUser);

  return <AuthContext.Provider value={{ authUser, dbUser }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
