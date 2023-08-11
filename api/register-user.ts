import { CustomerDraft } from '@commercetools/platform-sdk';
import Client from './client';

async function registerUser(customerDraft: CustomerDraft) {
  const client = new Client().clientCredentialsClient;

  try {
    return await client.customers().post({ body: customerDraft }).execute();
  } catch (error) {
    throw error;
  }
}

export default registerUser;
