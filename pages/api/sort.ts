import Client from './client';

async function executeQuery(offset: number, filterStrings: string[], searchString: string, sortString?: string) {
  const client = Client.getInstance().clientCredentialsClient;

  const response = await client
    .productProjections()
    .search()
    .get({
      queryArgs: {
        offset,
        limit: 20,
        expand: ['masterVariant.prices[*].discounted.discount'],
        filter: filterStrings,
        'text.en': searchString,
        sort: sortString || undefined,
      },
    })
    .execute();
  return response.body;
}
function getSortedProducts(
  offset: number,
  filters: string[][],
  categories: string[],
  searchString: string,
  sortString?: string,
) {
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

  return executeQuery(offset, filterStrings, searchString, sortString);
}

export default getSortedProducts;
