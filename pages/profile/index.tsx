'use client';

import { App } from 'antd';
import { useContext, useState, useEffect } from 'react';
import Home from '@/components/home/home';
import { AuthContext } from '@/context/authorization-context';
import Profile from '@/components/user-profile/user-profile';
import getCountries from '@/pages/api/get-countries';

const Page = (): JSX.Element => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      const countryList = await getCountries();
      setCountries(countryList);
    }
    fetchCountries();
  }, []);

  const { isLoggedIn } = useContext(AuthContext);

  return <App notification={{ placement: 'bottom' }}>{isLoggedIn ? <Profile countries={countries} /> : <Home />}</App>;
};

export default Page;
