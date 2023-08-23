import Client from './client';

async function getAllProducts() {
  const client = new Client().clientCredentialsClient;

  try {
    const response = await client.productProjections().get().execute();
    return { response: response.body.results };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return errorResponse;
  }
}

export default getAllProducts;
