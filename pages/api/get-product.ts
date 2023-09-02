import { ProductProjection } from '@commercetools/platform-sdk';
import Client from './client';

async function getProductbyKey(key: string): Promise<ProductProjection | null> {
  const client = new Client().clientCredentialsClient;

  try {
    const response = await client.productProjections().withKey({ key }).get().execute();
    return response.body;
  } catch (error) {
    return null;
  }
}

export default getProductbyKey;
