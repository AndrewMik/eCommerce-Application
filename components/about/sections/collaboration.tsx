import Link from 'next/link';
import Image from 'next/image';

import { Card, Col, Row } from 'antd';
import FontColors from '@/components/product/product.data';

import logo from '../../../public/rs-logo.svg';

interface CollaborationProps {
  collaboration: string;
}

const customClassname = 'custom-card-title';
const customCardTitleStyles = `
.ant-card-head-title {
  color: #454E63 !important;
}

.ant-card-body {
  height: 100% !important;
}`;

const collaborationTitle = '💪🏻 Collaboration';
const linkTitle = 'Made with ❤️ at';

const Collaboration: React.FC<CollaborationProps> = ({ collaboration }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col md={24} lg={16}>
          <Card title={collaborationTitle} style={{ color: FontColors.BASE }} className={customClassname}>
            <p
              dangerouslySetInnerHTML={{
                __html: collaboration.replace(/\n/g, '<br /><br />'),
              }}
            ></p>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={8} style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Card
              title={linkTitle}
              style={{
                color: FontColors.BASE,
                height: '100%',
              }}
              className={customClassname}
            >
              <Link
                href={'https://rs.school/'}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 64px)' }}
              >
                <Image src={logo} height={64} alt="Kiddo Kingdom" priority={true} />
              </Link>
            </Card>
          </div>
        </Col>
      </Row>
      <style>{customCardTitleStyles}</style>
    </>
  );
};

export default Collaboration;
