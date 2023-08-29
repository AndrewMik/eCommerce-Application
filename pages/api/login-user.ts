import { ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function loginUser(email: string, password: string) {
  const client = Client.getInstance().getPasswordFlowClient(email, password);
  const body = {
    email,
    password,
  };

  try {
    const response = await client.login().post({ body }).execute();
    const token = Client.token.get();
    return { statusCode: response.statusCode, token };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { statusCode: errorResponse.body.statusCode };
  }
}

export default loginUser;
