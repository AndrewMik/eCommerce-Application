import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function getAllCategories() {
  const client = new Client().clientCredentialsClient;

  try {
    const response = await client
      .categories()
      .get({
        queryArgs: {
          limit: 30,
        },
      })
      .execute();

    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}

export default getAllCategories;
