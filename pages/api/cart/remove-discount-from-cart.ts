import { ClientResponse } from '@commercetools/sdk-client-v2';
import { Cart, DiscountCodeReference, ErrorResponse } from '@commercetools/platform-sdk';
import Client from '../client';

async function removeDiscountFromCart(discountCode: DiscountCodeReference) {
  const client = Client.getInstance().anonymousClient;
  const cart: Cart = JSON.parse(localStorage.getItem('cart') ?? '[]');

  if (cart) {
    try {
      const response = await client
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: cart.version,
            actions: [{ action: 'removeDiscountCode', discountCode }],
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
      return errorResponse.body;
    }
  }
  return null;
}

export default removeDiscountFromCart;
