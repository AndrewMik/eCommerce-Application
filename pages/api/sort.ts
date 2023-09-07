import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function executeQuery(filterStrings: string[], searchString: string, sortString: string) {
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
          'text.en': searchString,
          sort: sortString,
        },
      })
      .execute();
    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { response: errorResponse.body ? errorResponse.body.statusCode : null };
  }
}
/* eslint-disable @typescript-eslint/default-param-last */
function getSortedProducts(filters: string[][], categories: string[], searchString = '', sortString: string) {
  let filterStrings: string[] = [];

  if (filters.length > 0) {
    const groupedFilters: { [key: string]: string[] } = {};

    filters.forEach((filter) => {
      let key = '';
      let value = '';
      if (filter.length === 3) {
        [value, , key] = filter;
      } else {
        [value, key] = filter;
      }

      groupedFilters[key] = groupedFilters[key] || [];
      groupedFilters[key].push(value);
    });

    filterStrings = Object.entries(groupedFilters).map(([key, values]) => {
      const valueStrings = values.map((value) => `"${value}"`).join(', ');

      if (key === 'category') {
        const subCategoriesString = values.map((string) => string.split('subCategory-').join(''));
        return `categories.id:${subCategoriesString.map((value) => `subtree("${value}")`).join(', ')}`;
      }

      return `variants.attributes.${key}.key:${valueStrings}`;
    });
  } else if (!['age-range', 'brand', 'material', 'gender', 'category'].includes(categories[0])) {
    filterStrings = categories.map((category) => {
      if (!category) return '';
      const keyVariat = category.split('-');
      const keyToPass = keyVariat.slice(1).join('-');
      return `categories.id: subtree("${keyToPass}")`;
    });
  }

  return executeQuery(filterStrings, searchString, sortString);
}

export default getSortedProducts;
