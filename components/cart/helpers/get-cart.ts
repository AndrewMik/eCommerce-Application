import { Cart } from '@commercetools/platform-sdk';
import getActiveCart from '@/pages/api/get-active-cart';

const getCart = async (): Promise<Cart | null> => {
  const response = await getActiveCart();
  if (response !== 404) {
    return response;
  }
  return null;
};

export default getCart;
