'use client';

import { useContext } from 'react';
import Home from '@/components/home/home';
import { AuthContext } from '@/context/authorization-context';
import Profile from '@/components/user-profile/user-profile';

const Page = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? <Profile /> : <Home />}</>;
};

export default Page;
