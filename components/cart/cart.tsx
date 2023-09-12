import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import EmptyCart from './empty-cart/empty-cart';
import getCart from './helpers/get-cart';

const CustomerCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const userCart = await getCart();
      setCart(userCart);
    };

    fetchCart();
  }, []);

  return cart?.lineItems.length ? <>Cart Content</> : <EmptyCart />;
};

export default CustomerCart;
