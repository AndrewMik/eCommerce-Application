'use client';

import { useState, useEffect } from 'react';
import RegistrationForm from '@/components/registration-form/registration-form';
import getCountries from '@/api/get-countries';

const Page = (): JSX.Element => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      const countryList = await getCountries();
      setCountries(countryList);
    }
    fetchCountries();
  }, []);

  return <RegistrationForm countries={countries} />;
};

export default Page;
