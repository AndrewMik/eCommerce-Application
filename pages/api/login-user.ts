import { ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function loginUser(email: string, password: string) {
  try {
    const client = Client.getInstance().getPasswordFlowClient(email, password);
    const body = {
      email,
      password,
    };

    Client.token.clear();
    const response = await client.login().post({ body }).execute();
    const token = Client.token.get();
    localStorage.setItem('userToken', token.token);
    localStorage.setItem('refreshToken', token.refreshToken as string);
    return { statusCode: response.statusCode, token };
  } catch (error) {
    Client.getInstance().clearApiRoot();
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { statusCode: errorResponse.body.statusCode };
  }
}

export default loginUser;
