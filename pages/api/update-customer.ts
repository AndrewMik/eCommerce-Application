import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
// import { getCode } from 'country-list';
import { getBirthDate, getSalutation } from '@/components/registration-form/helpers/helper-functions';
import { FormData } from '../../components/registration-form/helpers/registration.types';
import Client from './client';

async function updateCustomer(customerData: Customer, formData: FormData) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);
  // eslint-disable-next-line no-console
  console.log(formData);

  const options: MyCustomerUpdate = {
    version: customerData.version,
    actions: [
      {
        action: 'setFirstName',
        firstName: `${formData.firstName}`,
      },
      {
        action: 'setLastName',
        lastName: `${formData.lastName}`,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: `${getBirthDate(formData.dateOfBirth)}`,
      },
      {
        action: 'setSalutation',
        salutation: `${getSalutation(formData.gender)}`,
      },
      {
        action: 'changeEmail',
        email: `${formData.email}`,
      },
    ],
  };

  try {
    const response = await client.me().post({ body: options }).execute();

    return response;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return { statusCode: errorResponse.code };
  }
}

export default updateCustomer;
