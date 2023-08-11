import { CustomerDraft } from '@commercetools/platform-sdk';
import Client from './client';

function registerUser(customerDraft: CustomerDraft) {
  const client = new Client().clientCredentialsClient;

  try {
    const response = client.customers().post({ body: customerDraft }).execute();
    return response; // this will contain details of the newly created customer
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // or handle it more gracefully depending on your application's requirements
  }
}

export default registerUser;
