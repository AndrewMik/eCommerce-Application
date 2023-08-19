'use client';

import { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  toggleNotificationForLogIn: boolean;
  toggleNotificationForRegistration: boolean;
  registrationStatusCode: number | null;
  logInStatusCode: number | null;
  isLoggedIn: boolean | null;
  userToken: string | null;
  isRegistered: boolean;
  setUserToken: (token: string | null) => void;
  setIsRegistered: (isRegistered: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  saveLogInState: (id: string) => void;
  removeLogInState: () => void;
  setToggleNotificationForLogIn: (state: boolean | ((prevState: boolean) => boolean)) => void;
  setToggleNotificationForRegistration: (state: boolean | ((prevState: boolean) => boolean)) => void;
  setRegistrationStatusCode: (statusCode: number | null) => void;
  setLogInStatusCode: (statusCode: number | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  logInStatusCode: null,
  registrationStatusCode: null,
  toggleNotificationForLogIn: false,
  toggleNotificationForRegistration: false,
  isLoggedIn: null,
  userToken: null,
  isRegistered: false,
  setIsLoggedIn: () => {},
  setIsRegistered: () => {},
  setUserToken: () => {},
  saveLogInState: () => {
    throw new Error('saveLogInState function must be overridden');
  },
  removeLogInState: () => {
    throw new Error('removeLogInState function must be overridden');
  },
  setToggleNotificationForLogIn: () => {},
  setToggleNotificationForRegistration: () => {},
  setRegistrationStatusCode: () => {},
  setLogInStatusCode: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toggleNotificationForLogIn, setToggleNotificationForLogIn] = useState<boolean>(false);
  const [toggleNotificationForRegistration, setToggleNotificationForRegistration] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [registrationStatusCode, setRegistrationStatusCode] = useState<number | null>(null);
  const [logInStatusCode, setLogInStatusCode] = useState<number | null>(null);

  useEffect(() => {
    sessionStorage.removeItem('userToken');
  }, []);

  const saveLogInState = (token: string) => {
    sessionStorage.setItem('userToken', token);
    setIsLoggedIn(true);
  };

  const removeLogInState = () => {
    sessionStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userToken,
        saveLogInState,
        removeLogInState,
        isRegistered,
        setIsRegistered,
        toggleNotificationForLogIn,
        setToggleNotificationForLogIn,
        toggleNotificationForRegistration,
        setToggleNotificationForRegistration,
        registrationStatusCode,
        setRegistrationStatusCode,
        logInStatusCode,
        setLogInStatusCode,
        setIsLoggedIn,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
