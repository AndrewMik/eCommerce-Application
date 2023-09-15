import { HomeOutlined } from '@ant-design/icons';
import { Cart, ErrorResponse, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { Breadcrumb, Button, Divider, Input, Layout, message, Popconfirm, Space, theme, Typography } from 'antd';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import updateCart from '@/pages/api/update-cart';
import removeDiscountFromCart from '@/pages/api/cart/remove-discount-from-cart';
import getActiveCartWithDiscount from '@/pages/api/cart/get-cart-with-discount';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';
import CartItem from './cart-item';
import TotalPrice from '../prices/total-price';

const { Content } = Layout;
const { Title } = Typography;
interface Props {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart | null>>;
}

type Response = Cart | ErrorResponse | undefined | null;

const CartContent = ({ cart, setCart }: Props) => {
  function checkIfPromoExists() {
    return cart.discountCodes && cart.discountCodes.length > 0;
  }

  const [messageApi, contextHolder] = message.useMessage();
  const [isPromoExists, setIsPromoExist] = useState(checkIfPromoExists());
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoInputValue, setPromoInputValue] = useState('');
  const key = 'msg';

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

  const displayMessageLoaded = () => {
    messageApi.open({
      key,
      type: 'success',
      content: 'Promo Discount applied!',
      duration: 2,
    });
  };

  const displayMessageWrongPromo = () => {
    messageApi.open({
      key,
      type: 'error',
      content: 'Provided promo does not exist',
      duration: 2,
    });
  };

  const displayMessageRemoved = () => {
    messageApi.open({
      key,
      type: 'success',
      content: 'Discount removed!',
      duration: 2,
    });
  };

  const handleResponse = (response: Response) => {
    if (response) {
      if ('statusCode' in response) {
        handleErrorResponse(response);
        displayMessageWrongPromo();
        setIsPromoApplied(false);
      } else {
        setIsPromoApplied(true);
        displayMessageLoaded();
        setCart(response);
        localStorage.setItem('cart', JSON.stringify(response));
      }
    }
  };

  const handleApplyPromo = async () => {
    setIsPromoExist(true);
    const response = await getActiveCartWithDiscount(promoInputValue);
    handleResponse(response);
    setPromoInputValue('');
  };

  const handleRemovePromo = async () => {
    setIsPromoApplied(false);
    setIsPromoExist(false);
    const response = cart.discountCodes[0] && (await removeDiscountFromCart(cart.discountCodes[0].discountCode));
    handleResponse(response);
    displayMessageRemoved();
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
            return <CartItem key={item.id} item={item} cart={cart} setCart={setCart} isPromoExists={isPromoExists} />;
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
            {isPromoExists && isPromoApplied ? (
              <Space.Compact style={{ width: '100%' }}>
                <Button onClick={handleRemovePromo}>Remove Promo Discount</Button>
              </Space.Compact>
            ) : (
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder="enter promo"
                  value={promoInputValue}
                  onChange={(e) => setPromoInputValue(e.target.value)}
                />
                <Button disabled={promoInputValue.length === 0} onClick={handleApplyPromo}>
                  Apply
                </Button>
              </Space.Compact>
            )}
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
