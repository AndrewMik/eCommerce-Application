import { Cart } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';
import getActiveCart from '../../../pages/api/cart/get-active-cart';

const getCart = async (): Promise<Cart | null> => {
  const response = await getActiveCart();

  if (response) {
    if ('statusCode' in response) {
      handleErrorResponse(response);
    } else {
      return response;
    }
  }
  return null;
};

export default getCart;
