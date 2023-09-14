import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import getCart from './helpers/get-cart';
import CartContent from './cart-items/cart-content';
import EmptyCart from './empty-cart/empty-cart';
import Spinner from '../spinner/spinner';

const CustomerCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchCart = async () => {
      const userCart = await getCart();
      setCart(userCart);
      setIsCartLoaded(true);
    };
    fetchCart();
  }, []);

  return (
    (isCartLoaded && (cart?.lineItems.length ? <CartContent cart={cart} setCart={setCart} /> : <EmptyCart />)) || (
      <Spinner />
    )
  );
};

export default CustomerCart;
