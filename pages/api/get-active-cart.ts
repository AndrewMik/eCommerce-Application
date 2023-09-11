import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function getActiveCart() {
  const client = Client.getInstance().anonymousClient;

  try {
    const response = await client.me().activeCart().get().execute();

    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    if (errorResponse.body?.statusCode !== 404) {
      throw new Error('something went wrong');
    }
    return errorResponse.body?.statusCode;
  }
}

export default getActiveCart;
