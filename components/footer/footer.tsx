'use client';

import { Layout } from 'antd';

const MainFooter: React.FC = () => {
  const { Footer } = Layout;

  return (
    <div style={{ margin: '0', width: '100vw' }}>
      <Layout>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default MainFooter;
