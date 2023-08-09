'use client';

import { Layout, Menu } from 'antd';

const MainHeader: React.FC = () => {
  const { Header } = Layout;
  const navbar = ['About', 'Login', 'Registration', 'Catalog', 'Cart'];

  return (
    <div>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={navbar.map((nav, index) => ({
              key: String(index + 1),
              label: nav,
            }))}
          />
        </Header>
      </Layout>
    </div>
  );
};

export default MainHeader;
