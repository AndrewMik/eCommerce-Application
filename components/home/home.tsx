'use client';

import { Col, List, Row } from 'antd';
import { navigationMainPage } from '@/utils/route-links';

const Home = (): JSX.Element => {
  return (
    <>
      <List
        bordered
        dataSource={navigationMainPage}
        renderItem={(item) => (
          <List.Item>
            <Row justify="start" gutter={8}>
              <Col> {item.icon}</Col>
              <Col> {item.label}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;
