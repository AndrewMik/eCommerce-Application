import React from 'react';
import { Typography, Divider, Row, Col } from 'antd';

const { Link } = Typography;

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
          <Link href={href}>Login here!</Link>
        </Col>
      </Row>
    </>
  );
};

export default FooterMessage;
