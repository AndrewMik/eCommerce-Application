import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import handleRefreshTokenInLocalStorage from '../../../utils/handleRefreshTokenInLocalStorage';
import Client from '../client';

async function getCartWithToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

    handleRefreshTokenInLocalStorage();
    try {
      const response = await client.me().activeCart().get().execute();

      return response.body;
    } catch (error) {
      const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
      return errorResponse.body;
    }
  } else {
    return null;
  }
}

export default getCartWithToken;
