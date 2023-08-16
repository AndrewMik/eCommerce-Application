'use client';
import LoginForm from '@/components/login-form/login-form';
import { AuthProvider } from '../../context/authorization-context';

const Page = (): JSX.Element => {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
};

export default Page;
