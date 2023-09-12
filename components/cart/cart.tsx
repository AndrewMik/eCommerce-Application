import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import getCart from './helpers/get-cart';
import CartItems from './cart-items/cart-items';

const CustomerCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const userCart = await getCart();
      setCart(userCart);
    };

    fetchCart();
  }, []);

  return cart?.lineItems.length ? <CartItems cart={cart} /> : <>Empty Cart</>;
};

export default CustomerCart;
