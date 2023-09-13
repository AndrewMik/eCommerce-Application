import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from '../client';

async function createNewCartWithProduct(productId: string) {
  const client = Client.getInstance().anonymousClient;

  try {
    const response = await client
      .me()
      .carts()
      .post({
        body: { currency: 'USD', lineItems: [{ productId }] },
      })
      .execute();

    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body;
  }
}

export default createNewCartWithProduct;
