import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import Client from './client';

async function removeAddress(version: number, addressId: string) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  const options: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'removeAddress',
        addressId,
      },
    ],
  };

  const response = await client.me().post({ body: options }).execute();
  return response;
}

export default removeAddress;
