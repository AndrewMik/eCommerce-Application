import { HomeOutlined, LoginOutlined, UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';

export enum Paths {
  HOME = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  CATALOG = '/catalog',
  CART = '/cart',
}

export const navigationLinks = [
  { key: Paths.HOME, label: <Link href={Paths.HOME}>Home</Link>, icon: <HomeOutlined style={{ color: '#633211' }} /> },
  {
    key: Paths.LOGIN,
    label: <Link href={Paths.LOGIN}>Sign in</Link>,
    icon: <LoginOutlined style={{ color: '#1ea620' }} />,
  },
  {
    key: Paths.REGISTRATION,
    label: <Link href={Paths.REGISTRATION}>Sign up</Link>,
    icon: <UserOutlined style={{ color: '#f5a60a' }} />,
  },
  {
    key: Paths.CATALOG,
    label: <Link href={Paths.CATALOG}>Catalog</Link>,
    icon: <ShoppingOutlined style={{ color: '#f50abe' }} />,
  },
  {
    key: Paths.CART,
    label: <Link href={Paths.CART}>Cart</Link>,
    icon: <ShoppingCartOutlined style={{ color: '#0c0ced' }} />,
  },
];

export const navigationMainPage = [...navigationLinks].splice(1);
