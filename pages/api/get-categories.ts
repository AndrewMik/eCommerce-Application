import Client from './client';

async function getAllCategories() {
  const client = Client.getInstance().clientCredentialsClient;
  const response = await client
    .categories()
    .get({
      queryArgs: {
        limit: 30,
      },
    })
    .execute();

  const types = await client.types().get().execute();

  return { response: response.body.results, types: types.body.results };
}

export default getAllCategories;
