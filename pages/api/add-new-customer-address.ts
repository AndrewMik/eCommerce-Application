import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { getCode } from 'country-list';
import { FormDataAddNewAddress } from '../../components/registration-form/helpers/registration.types';
import Client from './client';

async function addNewCustomerAddress(customerData: Customer, formData: FormDataAddNewAddress) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  const options: MyCustomerUpdate = {
    version: customerData.version,
    actions: [
      {
        action: 'addAddress',
        address: {
          streetName: formData.street_newAddress,
          postalCode: formData.postalCode_newAddress,
          city: formData.city_newAddress,
          country: getCode(formData.country_newAddress) as string,
          building: formData.building_newAddress,
          apartment: formData.apartment_newAddress,
        },
      },
    ],
  };
  const response = await client.me().post({ body: options }).execute();

  return response.body;
}

export default addNewCustomerAddress;
