import { HomeOutlined } from '@ant-design/icons';
import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { Breadcrumb, Button, Divider, Input, Layout, message, Popconfirm, Space, theme, Typography } from 'antd';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import updateCart from '@/pages/api/update-cart';
import CartItem from './cart-item';
import TotalPrice from '../prices/total-price';

const { Content } = Layout;
const { Title } = Typography;

interface Props {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart | null>>;
}

const CartContent = ({ cart, setCart }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const clearShoppingCartHandler = async () => {
    const actions: MyCartUpdateAction[] = cart.lineItems.map((lineItem) => ({
      action: 'removeLineItem',
      lineItemId: lineItem.id,
    }));

    const response = await updateCart(cart.id, cart.version, actions);
    if (response && 'type' in response) {
      setCart(response as Cart);
    } else {
      setCart(null);
    }
  };

  const displayMessageLoading = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
  };

  const displayMessageLoaded = () => {
    messageApi.open({
      key,
      type: 'success',
      content: 'Discount applied!',
      duration: 2,
    });
  };

  const handleButtonClick = () => {
    displayMessageLoading();
    setTimeout(() => {
      displayMessageLoaded();
    }, 1000);
  };

  return (
    <Layout>
      {contextHolder}
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
            return <CartItem key={item.id} item={item} cart={cart} setCart={setCart} />;
          })}
          <Space
            style={{
              width: '100%',
              height: '50px',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <Title style={{ margin: 0 }} level={2}>
              Total Price: <TotalPrice cart={cart} />
            </Title>
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="enter promo" />
              <Button onClick={handleButtonClick}>Apply</Button>
            </Space.Compact>
          </Space>
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
