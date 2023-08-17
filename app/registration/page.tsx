'use client';

import { useState, useEffect, useContext } from 'react';
import RegistrationForm from '@/components/registration-form/registration-form';
import Home from '@/components/home/home';
import getCountries from '@/api/get-countries';
import { AuthContext } from '../../context/authorization-context';

const Page = (): JSX.Element => {
  const [countries, setCountries] = useState<string[]>([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCountries() {
      const countryList = await getCountries();
      setCountries(countryList);
    }
    fetchCountries();
  }, []);

  return <>{isLoggedIn ? <Home /> : <RegistrationForm countries={countries} />};</>;
};

export default Page;
