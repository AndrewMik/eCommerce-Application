import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import getCustomerId from '@/utils/get-customer-id';
import Client from './client';

async function getClient() {
  const client = new Client().anonymousClient;

  try {
    let response;
    const customerID = getCustomerId();

    if (customerID) {
      response = await client.customers().withId({ ID: customerID }).get().execute();
    } else {
      throw new Error('Customer id is not found');
    }

    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}

export default getClient;
