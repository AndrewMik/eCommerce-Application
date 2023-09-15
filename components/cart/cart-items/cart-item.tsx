import { Cart, LineItem, ProductDiscountReference, TypedMoney } from '@commercetools/platform-sdk';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import updateCart from '@/pages/api/update-cart';
import ItemPrice from '../prices/item-price';
import ItemSubtotal from '../prices/item-subtotal';
import ItemQuantity from './quantity/item-quantity';
import ItemPriceWithCartDiscount from '../prices/item-cart-discount';

interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}
interface LineItemExpanded extends LineItem {
  discountedPrice?: DiscountedPrice;
}

interface Props {
  item: LineItemExpanded;
  cart: Cart;
  isPromoExists: boolean;
  setCart: Dispatch<SetStateAction<Cart | null>>;
}

const { Title } = Typography;

const CartItem = ({ item, cart, setCart, isPromoExists }: Props) => {
  let imageUrl = '';
  if (item.variant.images) {
    imageUrl = item.variant.images[0].url;
  }

  const removeLineItemFromCart = async () => {
    const response = await updateCart(cart.id, cart.version, [{ action: 'removeLineItem', lineItemId: item.id }]);
    if (response && 'type' in response) {
      setCart(response as Cart);
    } else {
      setCart(null);
    }
  };

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
        {item.discountedPrice && isPromoExists ? (
          <ItemPriceWithCartDiscount item={item} isPromoExists={isPromoExists} />
        ) : (
          <ItemPrice item={item} isPromoExists={isPromoExists} />
        )}
        <p>
          Quantity: <ItemQuantity item={item} cart={cart} setCart={setCart} />
        </p>
        <p>
          Subtotal: <ItemSubtotal item={item} isPromoExists={isPromoExists} />
        </p>
        <Button danger onClick={removeLineItemFromCart}>
          Remove from Cart
        </Button>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartItem;
