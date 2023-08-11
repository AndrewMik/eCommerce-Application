import { CustomerDraft } from '@commercetools/platform-sdk';
import Client from './client';

function registerUser(customerDraft: CustomerDraft) {
  const client = new Client().clientCredentialsClient;

  try {
    const response = client.customers().post({ body: customerDraft }).execute();
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export default registerUser;
