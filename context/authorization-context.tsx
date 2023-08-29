import { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  toggleNotificationForLogIn: boolean;
  toggleNotificationForRegistration: boolean;
  registrationStatusCode: number | null;
  logInStatusCode: number | null;
  isLoggedIn: boolean | null;
  userToken: string | null;
  userRefreshToken: string | null;
  toggleInactiveLinks: boolean | null;
  setToggleInactiveLinks: (state: boolean | null | ((prevState: boolean | null) => boolean | null)) => void;
  setUserToken: (token: string | null) => void;
  setUserRefreshToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  saveLogInState: (token: string, refreshToken: string) => void;
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
  toggleInactiveLinks: null,
  setToggleInactiveLinks: () => {},
  isLoggedIn: null,
  userToken: null,
  userRefreshToken: null,
  setIsLoggedIn: () => {},
  setUserToken: () => {},
  setUserRefreshToken: () => {},
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
  const [userRefreshToken, setUserRefreshToken] = useState<string | null>(null);
  const [registrationStatusCode, setRegistrationStatusCode] = useState<number | null>(null);
  const [logInStatusCode, setLogInStatusCode] = useState<number | null>(null);
  const [toggleInactiveLinks, setToggleInactiveLinks] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token && refreshToken) {
      setIsLoggedIn(true);
      setUserToken(token);
      setUserRefreshToken(refreshToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const saveLogInState = (token: string, refreshToken: string) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true);
  };

  const removeLogInState = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        toggleInactiveLinks,
        setToggleInactiveLinks,
        isLoggedIn,
        userToken,
        userRefreshToken,
        saveLogInState,
        removeLogInState,
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
        setUserRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
