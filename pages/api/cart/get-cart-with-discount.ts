import { ClientResponse } from '@commercetools/sdk-client-v2';
import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import Client from '../client';

async function getActiveCartWithDiscount(promoCode: string) {
  const client = Client.getInstance().anonymousClient;
  const cart: Cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
  if (cart) {
    try {
      const response = await client
        .me()
        .carts()
        .withId({ ID: cart.id })
        .post({
          queryArgs: {
            expand: ['cartDiscounts[*]'],
          },
          body: {
            version: cart.version,
            actions: [{ action: 'addDiscountCode', code: promoCode }],
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
      if (errorResponse.statusCode === 403) {
        window.location.reload();
      }
      return errorResponse.body;
    }
  }
  return null;
}

export default getActiveCartWithDiscount;
