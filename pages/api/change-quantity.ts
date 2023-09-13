import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function changeQuantity(cartId: string, cartVersion: number, lineItemId: string, quantity: number) {
  const client = Client.getInstance().anonymousClient;

  try {
    const response = await client
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [{ action: 'changeLineItemQuantity', lineItemId, quantity }],
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body;
  }
}

export default changeQuantity;
