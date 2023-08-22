'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../../context/authorization-context';

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Wrapper;
