'use client';

import { useContext } from 'react';
import LoginForm from '@/components/login-form/login-form';
import Home from '@/components/home/home';
import { AuthContext } from '@/context/authorization-context';

const Page = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  return <>{isLoggedIn ? <Home /> : <LoginForm />}</>;
};

export default Page;
