import { BaseAddress, MyCustomerUpdate } from '@commercetools/platform-sdk';
import Client from './client';

async function changeAddress(version: number, addressId: string, address: BaseAddress) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  const options: MyCustomerUpdate = {
    version,
    actions: [
      {
        action: 'changeAddress',
        addressId,
        address,
      },
    ],
  };

  const response = await client.me().post({ body: options }).execute();
  return response;
}

export default changeAddress;
