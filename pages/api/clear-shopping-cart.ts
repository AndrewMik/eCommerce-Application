import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ErrorResponse, LineItem, MyCartUpdateAction } from '@commercetools/platform-sdk';
import Client from './client';

async function clearShoppingCart(cartId: string, cartVersion: number, lineItems: LineItem[]) {
  const client = Client.getInstance().anonymousClient;

  try {
    const actions: MyCartUpdateAction[] = lineItems.map((lineItem) => ({
      action: 'removeLineItem',
      lineItemId: lineItem.id,
    }));

    const response = await client
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions,
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error)) as ClientResponse<ErrorResponse>;
    return errorResponse.body;
  }
}

export default clearShoppingCart;
