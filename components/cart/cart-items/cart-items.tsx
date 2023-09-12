import { HomeOutlined } from '@ant-design/icons';
import { Cart } from '@commercetools/platform-sdk';
import { Breadcrumb, Col, Divider, Layout, Row, theme, Typography } from 'antd';
import Link from 'next/link';
import { getPrice, getTotalPrice, getTotalItemPrice } from '../helpers/get-price';

const { Content } = Layout;
const { Title } = Typography;

interface Props {
  cart: Cart;
}

const CartItems = ({ cart }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/cart">Cart</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
          <Title style={{ margin: 0 }}>Shopping Cart</Title>
          <Divider />
          {cart.lineItems.map((item) => {
            let imageUrl = '';
            if (item.variant.images) {
              imageUrl = item.variant.images[0].url;
            }

            return (
              <Row key={item.id}>
                <Col flex="250px">
                  <img
                    src={imageUrl}
                    alt={item.name.en}
                    style={{ width: 240, aspectRatio: 1, borderRadius: '1%', objectFit: 'cover' }}
                  />
                </Col>
                <Col flex="auto" style={{ width: '250px' }}>
                  <Title key={item.id} level={4} style={{ margin: 0 }}>
                    {item.name.en}
                  </Title>
                  {getPrice(item)}
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: {getTotalItemPrice(item)}</p>
                </Col>
                <Divider />
              </Row>
            );
          })}
          <Title level={2}>Total Price: {getTotalPrice(cart)}</Title>
        </div>
      </Content>
    </Layout>
  );
};

export default CartItems;
