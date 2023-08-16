'use client';

import { Layout, Menu, Button, Drawer, Row, Col } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
import { navigationLinks } from '../../utils/route-links';
import logo from '../../public/kiddo-logo.svg';

const { Header } = Layout;

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
          <Link href={Paths.HOME} style={{ marginLeft: 10 }}>
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
          <Menu theme="dark" mode="horizontal" selectedKeys={[`${pathname}`]} items={navigationLinks} />
        </Col>
        <Col xs={4} sm={4} md={0}>
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Col>
      </Row>
      <Drawer title="Menu" placement="right" onClick={onClose} onClose={onClose} open={visible}>
        <Menu mode="vertical" selectedKeys={[`${pathname}`]} items={navigationLinks} />
      </Drawer>
    </Header>
  );
};

export default MainHeader;
