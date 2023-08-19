import { useState, useEffect, useContext } from 'react';
import RegistrationForm from '@/components/registration-form/registration-form';
import getCountries from '../api/get-countries';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/authorization-context';
import { Spin } from 'antd';

const Page = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const [countries, setCountries] = useState<string[]>([]);
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    } else {
      const timer = setTimeout(() => {
        setShowRegistrationForm(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    async function fetchCountries() {
      const countryList = await getCountries();
      setCountries(countryList);
    }
    fetchCountries();
  }, []);

  if (isLoggedIn) {
    return <></>;
  }

  if (showRegistrationForm) {
    return <RegistrationForm countries={countries} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );
};

export default Page;
