import Client from './client';

async function getAttributes() {
  const client = new Client().clientCredentialsClient;

  const response = await client.productTypes().get().execute();
  const { attributes } = response.body.results[0];

  return attributes;
}

export default getAttributes;
