import { MyCustomerUpdate, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { State } from '@/components/registration-form/helpers/registration.types';
import Client from './client';

async function setTagsToNewAddress(customerVersion: number, addressId: string, state: State) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);
  const updateActions: MyCustomerUpdateAction[] = [];

  if (state.isShipping) {
    updateActions.push({
      action: 'addShippingAddressId',
      addressId,
    });
  }

  const options: MyCustomerUpdate = {
    version: customerVersion,
    actions: updateActions,
  };

  try {
    const response = await client.me().post({ body: options }).execute();

    return response;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return { statusCode: errorResponse.code };
  }
}

export default setTagsToNewAddress;
