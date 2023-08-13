import { ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function loginUser(email: string, password: string) {
  const client = new Client().getPasswordFlowClient(email, password);
  const body = {
    email,
    password,
  };

  try {
    const response = await client.login().post({ body }).execute();
    return response.statusCode;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body.statusCode;
  }
}

export default loginUser;
