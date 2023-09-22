import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@/components/login-form/login-form';
import Spinner from '@/components/spinner/spinner';
import { AuthContext } from '../../context/authorization-context';

const Page = (): JSX.Element => {
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

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

  if (isLoggedIn) {
    return <></>;
  }
  if (showRegistrationForm) {
    return <LoginForm />;
  }

  return <Spinner />;
};

export default Page;
