import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Badge, ConfigProvider, Space } from 'antd';

import Link from 'next/link';

export enum Paths {
  HOME = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  CATALOG = '/catalog',
  CART = '/cart',
  PROFILE = '/profile',
}

export const navigationLinks = [
  { key: Paths.HOME, label: <Link href={Paths.HOME}>Home</Link>, icon: <HomeOutlined style={{ color: '#633211' }} /> },
  {
    key: Paths.ABOUT,
    label: <Link href={Paths.ABOUT}>About us</Link>,
    icon: <TeamOutlined style={{ color: '#5edaeb' }} />,
  },
  {
    key: Paths.CATALOG,
    label: <Link href={Paths.CATALOG}>Catalog</Link>,
    icon: <ShoppingOutlined style={{ color: '#f50abe' }} />,
  },
  {
    key: Paths.CART,
    label: (
      <Link href={Paths.CART}>
        <ConfigProvider
          theme={{
            components: {
              Badge: {
                fontSizeSM: 7,
                lineHeight: 200,
                paddingXS: 2,
              },
            },
          }}
        >
          <Space>
            <Badge count={5} size="small" offset={[2, -4]} color="volcano">
              <ShoppingCartOutlined style={{ color: '#F94C10' }} />
            </Badge>
            Cart
          </Space>
        </ConfigProvider>
      </Link>
    ),
  },
  {
    key: Paths.REGISTRATION,
    label: <Link href={Paths.REGISTRATION}>Sign up</Link>,
    icon: <UserOutlined style={{ color: '#f5a60a' }} />,
  },
  {
    key: Paths.LOGIN,
    label: <Link href={Paths.LOGIN}>Sign in</Link>,
    icon: <LoginOutlined style={{ color: '#1ea620' }} />,
  },
];

export const navigationMainPageForAuthorizedUser = [
  {
    key: Paths.PROFILE,
    label: <Link href={Paths.PROFILE}>Profile</Link>,
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
    icon: <ShoppingCartOutlined style={{ color: '#F94C10' }} />,
  },
];
