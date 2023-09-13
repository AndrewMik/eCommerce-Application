import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import getCart from './helpers/get-cart';
import CartContent from './cart-items/cart-content';

const CustomerCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const userCart = await getCart();
      setCart(userCart);
    };

    fetchCart();
  }, []);

  return cart?.lineItems.length ? <CartContent cart={cart} setCart={setCart} /> : <>Empty Cart</>;
};

export default CustomerCart;
