import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function getFilteredProducts(filters: string[][]) {
  const groupedFilters: { [key: string]: string[] } = {};

  filters.forEach((filter) => {
    const key = filter[1];
    const value = filter[0];
    if (groupedFilters[key]) {
      groupedFilters[key].push(value);
    } else {
      groupedFilters[key] = [value];
    }
  });

  const filterStrings = Object.entries(groupedFilters).map(([key, values]) => {
    const valueStrings = values.map((value) => `"${value}"`).join(', ');
    return `variants.attributes.${key}.key:${valueStrings}`;
  });

  const client = new Client().clientCredentialsClient;

  try {
    const response = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: 200,
          expand: ['masterVariant.prices[*].discounted.discount'],
          filter: filterStrings,
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
