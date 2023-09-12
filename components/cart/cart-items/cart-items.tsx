import { HomeOutlined } from '@ant-design/icons';
import { Cart } from '@commercetools/platform-sdk';
import { Breadcrumb, Divider, Layout, theme, Typography } from 'antd';
import Link from 'next/link';
import CartItem from './cart-item';
import TotalPrice from '../prices/total-price';

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
            return <CartItem key={item.id} item={item} />;
          })}
          <Title level={2}>
            Total Price: <TotalPrice cart={cart} />
          </Title>
        </div>
      </Content>
    </Layout>
  );
};

export default CartItems;
