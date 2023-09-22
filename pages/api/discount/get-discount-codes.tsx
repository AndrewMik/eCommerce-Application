import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from '../client';

async function getDiscountCodes() {
  const client = Client.getInstance().clientCredentialsClient;

  try {
    const response = await client
      .discountCodes()
      .get({
        queryArgs: {
          expand: ['cartDiscounts[*]'],
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body;
  }
}

export default getDiscountCodes;
