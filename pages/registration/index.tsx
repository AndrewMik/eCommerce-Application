import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import RegistrationForm from '@/components/registration-form/registration-form';
import { AuthContext } from '@/context/authorization-context';
import Spinner from '@/components/spinner/spinner';
import getCountries from '../api/get-countries';

const Page = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const [countries, setCountries] = useState<string[]>([]);
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | number;

    if (isLoggedIn) {
      router.push('/');
    } else {
      timer = setTimeout(() => {
        setShowRegistrationForm(true);
      }, 200);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
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

  return <Spinner />;
};

export default Page;
