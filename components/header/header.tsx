'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Layout, Menu, Button, Drawer, Row, Col, Typography } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  MenuOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../public/kiddo-logo.svg';
import Paths from './header-types';

const { Header } = Layout;
const { Link } = Typography;

const menuItems = [
  { key: Paths.HOME, label: <Link href={Paths.HOME}>Home</Link>, icon: <HomeOutlined /> },
  { key: Paths.LOGIN, label: <Link href={Paths.LOGIN}>Sign in</Link>, icon: <LoginOutlined /> },
  {
    key: Paths.REGISTRATION,
    label: <Link href={Paths.REGISTRATION}>Sign up</Link>,
    icon: <UserOutlined />,
  },
  { key: Paths.CATALOG, label: <Link href={Paths.CATALOG}>Catalog</Link>, icon: <ShoppingOutlined /> },
  { key: Paths.CART, label: <Link href={Paths.CART}>Cart</Link>, icon: <ShoppingCartOutlined /> },
];

const MainHeader = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header style={{ padding: 0 }}>
      <Row>
        <Col xs={20} sm={20} md={4} style={{ lineHeight: 0 }}>
          <Link href={'./'} style={{ marginLeft: 10 }}>
            <Image src={logo} height={64} alt="Kiddo Kingdom" priority={true} />
          </Link>
        </Col>
        <Col
          xs={0}
          sm={0}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 13, offset: 7 }}
          xl={{ span: 10, offset: 10 }}
          xxl={{ span: 8, offset: 12 }}
        >
          <Menu theme="dark" mode="horizontal" selectedKeys={[`${pathname}`]} items={menuItems} />
        </Col>
        <Col xs={4} sm={4} md={0}>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Col>
      </Row>
      <Drawer title="Menu" placement="right" onClick={onClose} onClose={onClose} open={visible}>
        <Menu mode="vertical" selectedKeys={[`${pathname}`]} items={menuItems} />
      </Drawer>
    </Header>
  );
};

export default MainHeader;
