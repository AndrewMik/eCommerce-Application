import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function getAllProducts(offset: number, limit: number = 20) {
  const client = Client.getInstance().clientCredentialsClient;

  try {
    const response = await client
      .productProjections()
      .get({
        queryArgs: {
          limit,
          offset,
          expand: ['masterVariant.prices[*].discounted.discount'],
        },
      })
      .execute();
    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}

export default getAllProducts;
