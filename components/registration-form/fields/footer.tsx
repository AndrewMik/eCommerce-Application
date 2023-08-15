import React from 'react';
import { Divider, Row, Col } from 'antd';
import Link from 'next/link';

interface FooterProps {
  href: string;
}

const FooterMessage: React.FC<FooterProps> = ({ href }) => {
  return (
    <>
      <Divider />
      <Row justify="center">
        <Col>
          <span>Already registered? </span>
          <Link href={href}>Sign in here!</Link>
        </Col>
      </Row>
    </>
  );
};

export default FooterMessage;
