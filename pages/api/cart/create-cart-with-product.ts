import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from '../client';

function handleRefreshTokenInLocalStorage() {
  const token = Client.token.get();
  if (token.refreshToken && token.refreshToken.length > 0) {
    localStorage.setItem('refreshToken', token.refreshToken as string);
  }
}

async function createNewCartWithProduct(productId: string) {
  const client = Client.getInstance().anonymousClient;
  console.log(Client.token.get());
  handleRefreshTokenInLocalStorage();
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
    if (errorResponse.statusCode === 403) {
      window.location.reload();
    }
    return errorResponse.body;
  }
}

export default createNewCartWithProduct;
