import { ClientResponse } from '@commercetools/sdk-client-v2';
import { Cart, ErrorResponse } from '@commercetools/platform-sdk';
import Client from '../client';

async function getActiveCartWithDiscount() {
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
            actions: [{ action: 'addDiscountCode', code: 'finish-line' }],
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
