import { Cart, LineItem } from '@commercetools/platform-sdk';
import { App, Button, Input, Spin } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import changeQuantity from '@/pages/api/change-quantity';
import getCart from '../../helpers/get-cart';

interface Props {
  item: LineItem;
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart | null>>;
}

const minQuantity = 1;

const ItemQuantity = ({ item, cart, setCart }: Props) => {
  const { notification } = App.useApp();

  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [isCartLoaded, setIsCartLoaded] = useState<boolean>(true);

  const maxQuantity = item.variant.availability?.availableQuantity ?? 1;

  useEffect(() => {
    const fetchCart = async () => {
      setIsCartLoaded(false);
      try {
        await changeQuantity(cart.id, cart.version, item.id, quantity);
        const userCart = await getCart();
        setCart(userCart);
        setIsCartLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (quantity !== item.quantity) {
      fetchCart();
    }
  }, [quantity]);

  const handleQuantityChange = debounce(async (newValue: number) => {
    if (newValue >= minQuantity && newValue <= maxQuantity) {
      setQuantity(newValue);
    } else if (newValue > maxQuantity) {
      setQuantity(maxQuantity);
      notification.info({
        message: `Sorry, we have only ${maxQuantity} ${item.name.en} available at the moment.`,
        description: 'Please contact us if you need more items.',
        placement: 'bottom',
      });
    } else {
      setQuantity(minQuantity);
    }
  }, 200);

  return (
    <>
      <Button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity === minQuantity}>
        <MinusOutlined />
      </Button>
      <Input
        value={quantity}
        style={{ width: 70, margin: '0 5px', textAlign: 'center' }}
        maxLength={4}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          handleQuantityChange(newValue);
        }}
      ></Input>
      <Button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= maxQuantity}>
        <PlusOutlined />
      </Button>
      {isCartLoaded || <Spin style={{ marginLeft: 5 }} />}
    </>
  );
};

export default ItemQuantity;
