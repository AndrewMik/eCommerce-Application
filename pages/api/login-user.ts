import { Cart, ClientResponse, ErrorResponse } from '@commercetools/platform-sdk';
import Client from './client';

async function loginUserWithCart(cart: Cart, email: string, password: string) {
  try {
    const client = Client.getInstance().getPasswordFlowClient(email, password);
    const body = {
      email,
      password,
      anonymousId: cart.anonymousId,
      anonymousCartId: cart.id,
      anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
      updateProductData: true,
    };

    Client.token.clear();
    const response = await client.login().post({ body }).execute();
    const token = Client.token.get();
    localStorage.setItem('userToken', token.token);
    localStorage.setItem('refreshToken', token.refreshToken as string);
    return { statusCode: response.statusCode, cart: response.body.cart, token };
  } catch (error) {
    Client.getInstance().clearApiRoot();
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { statusCode: errorResponse.body.statusCode };
  }
}

async function logInWithoutCart(email: string, password: string) {
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
    return { statusCode: response.statusCode, cart: response.body.cart, token };
  } catch (error) {
    Client.getInstance().clearApiRoot();
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return { statusCode: errorResponse.body.statusCode };
  }
}

async function loginUser(email: string, password: string) {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return loginUserWithCart(JSON.parse(cart), email, password);
  }

  return logInWithoutCart(email, password);
}

export default loginUser;
