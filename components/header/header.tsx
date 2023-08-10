'use client';

import { Layout, Menu, Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/kiddo-kingdom-logo.svg';

const MainHeader: React.FC = () => {
  const { Header } = Layout;
  const menuItems = [
    { key: '/', label: 'About' },
    { key: '/login', label: 'Login' },
    { key: '/registration', label: 'Registration' },
    { key: '/catalog', label: 'Catalog' },
    { key: '/cart', label: 'Cart' },
  ];

  return (
    <>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            minHeight: '90px',
          }}
        >
          <Row>
            <Col span={8}>
              <Link href={'./'}>
                <Image src={logo} width={120} height={80} alt="Picture of the author" style={{ marginRight: '20px' }} />
              </Link>
            </Col>
            <Col span={8} offset={8}>
              <Menu
                mode="horizontal"
                style={{ backgroundColor: '#f5f5f5' }}
                items={menuItems.map((item, index) => ({
                  key: `item${index}`,
                  label: <Link href={item.key}>{item.label}</Link>,
                }))}
              />
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
};

export default MainHeader;
