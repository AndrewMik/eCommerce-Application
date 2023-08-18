'use client';

import { Col, List, Row } from 'antd';
import { useContext } from 'react';
import { navigationMainPage, navigationMainPageForAuthorizedUser } from '@/utils/route-links';
import { AuthContext } from '../../context/authorization-context';

const Home = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <List
        bordered
        dataSource={isLoggedIn ? navigationMainPageForAuthorizedUser : navigationMainPage}
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
