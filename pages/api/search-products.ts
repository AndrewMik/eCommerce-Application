import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function getSearchedProducts(searchString: string) {
  const client = Client.getInstance().clientCredentialsClient;

  try {
    const response = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 200,
          expand: ['masterVariant.prices[*].discounted.discount'],
          'text.en': searchString,
          fuzzy: true,
        },
      })
      .execute();
    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}

export default getSearchedProducts;
