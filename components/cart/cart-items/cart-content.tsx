import { HomeOutlined } from '@ant-design/icons';
import { Cart } from '@commercetools/platform-sdk';
import { Breadcrumb, Button, Divider, Layout, Popconfirm, theme, Typography } from 'antd';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import clearShoppingCart from '@/pages/api/clear-shopping-cart';
import CartItem from './cart-item';
import TotalPrice from '../prices/total-price';
import getCart from '../helpers/get-cart';

const { Content } = Layout;
const { Title } = Typography;

interface Props {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart | null>>;
}

const CartContent = ({ cart, setCart }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const clearShoppingCartHandler = async () => {
    await clearShoppingCart(cart.id, cart.version, cart.lineItems);
    const userCart = await getCart();
    setCart(userCart);
  };

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
          <Popconfirm
            title="Clear Shopping Cart"
            description="Are you sure to clear shopping cart?"
            onConfirm={clearShoppingCartHandler}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Clear Shopping Cart
            </Button>
          </Popconfirm>
        </div>
      </Content>
    </Layout>
  );
};

export default CartContent;
