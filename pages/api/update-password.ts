import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import Client from './client';

async function updatePassword(version: number, currentPassword: string, newPassword: string) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  const options: MyCustomerChangePassword = {
    version,
    currentPassword,
    newPassword,
  };

  try {
    const response = await client.me().password().post({ body: options }).execute();

    return response;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return { statusCode: errorResponse.code };
  }
}

export default updatePassword;
