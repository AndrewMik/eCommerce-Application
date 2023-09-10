import { Button, Card, Col, Typography } from 'antd';
import Link from 'next/link';
import emptyCartImage from '../../../public/images/empty-cart.jpg';

const { Title, Text } = Typography;

const EmptyCart = () => {
  return (
    <Col style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <Card
        bodyStyle={{ padding: '3px', paddingTop: '20px' }}
        style={{ width: 280, position: 'relative', textAlign: 'center', height: '450px' }}
        cover={
          <div
            style={{
              height: 220,
              overflow: 'hidden',
              borderRadius: '5px 5px 0 0',
              backgroundImage: `url(${emptyCartImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        }
      >
        <Title level={3}>Your cart is empty</Title>
        <Text>You have no items in your shopping cart. Let's go but something!</Text>
        <br />
        <Link href={`/catalog/`}>
          <Button type="primary" style={{ marginTop: 30 }}>
            Shop Now
          </Button>
        </Link>
      </Card>
    </Col>
  );
};

export default EmptyCart;
