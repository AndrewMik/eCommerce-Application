import { Cart, LineItem } from '@commercetools/platform-sdk';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import removeFromCart from '@/pages/api/remove-from-cart';
import ItemPrice from '../prices/item-price';
import ItemSubtotal from '../prices/item-subtotal';

interface Props {
  item: LineItem;
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart | null>>;
}

const { Title } = Typography;

const CartItem = ({ item, cart, setCart }: Props) => {
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
        <ItemPrice item={item} />
        <p>Quantity: {item.quantity}</p>
        <p>
          Subtotal: <ItemSubtotal item={item} />
        </p>
        <Button
          danger
          onClick={async () => {
            const response = await removeFromCart(cart.id, cart.version, item.id);
            if (response && 'type' in response) {
              setCart(response as Cart);
            } else {
              setCart(null);
            }
          }}
        >
          Remove from Cart
        </Button>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartItem;
