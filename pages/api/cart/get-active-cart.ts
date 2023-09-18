import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import { handleRefreshTokenInLocalStorage } from '../../../utils/handleRefreshTokenInLocalStorage';
import Client from '../client';

async function getActiveCart() {
  const client = Client.getInstance().anonymousClient;

  try {
    const response = await client.me().activeCart().get().execute();

    handleRefreshTokenInLocalStorage();
    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body;
  }
}

export default getActiveCart;
