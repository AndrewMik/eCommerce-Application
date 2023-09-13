import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse, MyCartUpdateAction } from '@commercetools/platform-sdk';
import Client from './client';

async function updateCart(cartId: string, cartVersion: number, actions: MyCartUpdateAction[]) {
  const client = Client.getInstance().anonymousClient;

  try {
    const response = await client
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions,
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body;
  }
}

export default updateCart;
