import { useContext, useEffect, useState } from 'react';
import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';
import getCartWithToken from '@/pages/api/cart/get-cart-with-token';
import getActiveCart from '@/pages/api/cart/get-active-cart';
import { AuthContext } from '@/context/authorization-context';
import CartContent from './cart-items/cart-content';
import EmptyCart from './empty-cart/empty-cart';
import Spinner from '../spinner/spinner';

type Response = Cart | ErrorResponse | null | undefined;

const CustomerCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);
  const { setCount } = useContext(AuthContext);

  const handleResponse = (response: Response) => {
    if (response) {
      if ('statusCode' in response) {
        handleErrorResponse(response);
      } else {
        setCart(response);
        localStorage.setItem('cart', JSON.stringify(response));
        setCount((response as Cart).lineItems.length);
      }
    }
    setIsCartLoaded(true);
  };

  const getCart = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken !== null) {
      const response = await getCartWithToken();
      handleResponse(response);
    } else {
      const response = await getActiveCart();
      handleResponse(response);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    (isCartLoaded && (cart?.lineItems.length ? <CartContent cart={cart} setCart={setCart} /> : <EmptyCart />)) || (
      <Spinner />
    )
  );
};

export default CustomerCart;
