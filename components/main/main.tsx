'use client';

import { Content } from 'antd/es/layout/layout';

const Main: React.FC = () => {
  return (
    <Content className="site-layout" style={{ padding: '0 50px', minHeight: '82vh' }}>
      <div style={{ paddingBlock: 24, minHeight: 380 }}>Content</div>
    </Content>
  );
};

export default Main;
