import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { getBirthDate, getSalutation } from '@/components/registration-form/helpers/helper-functions';
import { FormData } from '../../components/registration-form/helpers/registration.types';
import Client from './client';

async function updateCustomerPersonal(customerData: Customer, formData: FormData) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

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

  const response = await client.me().post({ body: options }).execute();
  return response;
}

export default updateCustomerPersonal;
