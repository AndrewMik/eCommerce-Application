import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function getFilteredProducts(filters: string[][], categories: string[]) {
  const groupedFilters: { [key: string]: string[] } = {};

  if (filters.length > 0) {
    filters.forEach((filter) => {
      let key = '';
      let value = '';

      if (filter.length === 3) {
        [value, , key] = filter;
      } else {
        [value, key] = filter;
      }

      if (groupedFilters[key]) {
        groupedFilters[key].push(value);
      } else {
        groupedFilters[key] = [value];
      }
    });

    const filterStrings = Object.entries(groupedFilters).map(([key, values]) => {
      const valueStrings = values.map((value) => `"${value}"`).join(', ');

      if (key === 'category') {
        const subCategoriesString = values.map((string) => string.split('subCategory-').join(''));

        const subtreeToPass = subCategoriesString.map((value) => `subtree("${value}")`).join(', ');

        return `categories.id:${subtreeToPass}`;
      }

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
  } else {
    const filterStrings = categories
      .map((category) => {
        const keyVariat = category.split('-');
        const keyToPass = keyVariat.slice(1).join('-');
        return `categories.id: subtree("${keyToPass}")`;
      })
      .filter((str): str is string => str !== undefined);

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
}

export default getFilteredProducts;
