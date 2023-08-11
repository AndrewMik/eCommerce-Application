'use client';

import { Content } from 'antd/es/layout/layout';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  return <Content>{children}</Content>;
};

export default Main;
