import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import Client from './client';
import loginUser from './login-user';

async function updatePassword(version: number, currentPassword: string, newPassword: string, email: string) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  const options: MyCustomerChangePassword = {
    version,
    currentPassword,
    newPassword,
  };

  try {
    const response = await client.me().password().post({ body: options }).execute();

    if (response.statusCode === 200) {
      Client.getInstance().clearApiRoot();
      return await loginUser(email, newPassword);
    }
    throw new Error('Login failed');
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return { statusCode: errorResponse.code };
  }
}

export default updatePassword;
