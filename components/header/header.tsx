'use client';

import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Row, Col } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  MenuOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/kiddo-kingdom-logo.svg';

const { Header } = Layout;

const menuItems = [
  { key: '1', label: <Link href={'./'}>Home</Link>, icon: <HomeOutlined /> },
  { key: '2', label: <Link href={'./login'}>Sign in</Link>, icon: <LoginOutlined /> },
  { key: '3', label: <Link href={'./registration'}>Sign up</Link>, icon: <UserOutlined /> },
  { key: '4', label: <Link href={'./catalog'}>Catalog</Link>, icon: <ShoppingOutlined /> },
  { key: '5', label: <Link href={'./cart'}>Cart</Link>, icon: <ShoppingCartOutlined /> },
];

const MainHeader = () => {
  const [visible, setVisible] = useState(false);

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
            <Image src={logo} height={64} alt="Kiddo Kingdom" />
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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
        </Col>
        <Col xs={4} sm={4} md={0}>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Col>
      </Row>
      <Drawer title="Menu" placement="right" onClick={onClose} onClose={onClose} open={visible}>
        <Menu mode="vertical" defaultSelectedKeys={['1']} items={menuItems} />
      </Drawer>
    </Header>
  );
};

export default MainHeader;
