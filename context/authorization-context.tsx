'use client';

import { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  toggleNotificationForLogIn: boolean;
  toggleNotificationForRegistration: boolean;
  registrationStatusCode: number | null;
  logInStatusCode: number | null;
  isLoggedIn: boolean | null;
  userId: string | null;
  isRegistered: boolean;
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
  userId: null,
  isRegistered: false,
  setIsLoggedIn: () => {},
  setIsRegistered: () => {},
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
  const [userId, setUserId] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [registrationStatusCode, setRegistrationStatusCode] = useState<number | null>(null);
  const [logInStatusCode, setLogInStatusCode] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const saveLogInState = (id: string) => {
    localStorage.setItem('userId', id);
    setIsLoggedIn(true);
    setUserId(id);
  };

  const removeLogInState = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
