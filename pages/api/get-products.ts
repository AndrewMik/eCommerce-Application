import { ClientResponse } from '@commercetools/sdk-client-v2';
import Client from './client';
import { ErrorResponse } from '@commercetools/platform-sdk';

async function getAllProducts() {
  const client = new Client().clientCredentialsClient;

  try {
    const response = await client.productProjections().get().execute();
    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}

export default getAllProducts;
