import LoginForm from '@/components/login-form/login-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authorization-context';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

const Page = (): JSX.Element => {
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

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

  if (isLoggedIn) {
    return <></>;
  }
  if (showRegistrationForm) {
    return <LoginForm />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );
};

export default Page;
