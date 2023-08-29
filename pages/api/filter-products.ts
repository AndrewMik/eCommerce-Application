import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';
import { AttributeValue } from '../../components/catalog-sider/types';

async function getFilteredProducts(name: string, value: AttributeValue) {
  const client = new Client().clientCredentialsClient;
  const filterStr = `variants.attributes.${name}.key:"${value.key}"`;

  try {
    const response = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 200,
          expand: ['masterVariant.prices[*].discounted.discount'],
          filter: filterStr,
        },
      })
      .execute();
    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}

export default getFilteredProducts;
