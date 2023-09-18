import { ProductProjection } from '@commercetools/platform-sdk';
import Client from './client';

async function getProductbyKey(key: string): Promise<ProductProjection | null> {
  const client = Client.getInstance().clientCredentialsClient;

  try {
    const response = await client.productProjections().withKey({ key }).get().execute();
    return response.body;
  } catch (error) {
    return null;
  }
}

export default getProductbyKey;
