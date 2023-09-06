import { Customer, MyCustomerUpdate, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { FormDataAddNewAddress } from '@/components/registration-form/helpers/registration.types';
import Client from './client';

async function setTagsToNewAddress(customer: Customer, formData: FormDataAddNewAddress) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);
  const updateActions: MyCustomerUpdateAction[] = [];

  if (formData.setAsBilling_newAddress) {
    updateActions.push({
      action: 'addBillingAddressId',
      addressId: customer.addresses.at(-1)?.id,
    });
  }

  if (formData.setAsShipping_newAddress) {
    updateActions.push({
      action: 'addShippingAddressId',
      addressId: customer.addresses.at(-1)?.id,
    });
  }

  if (formData.setAsDefaultBilling_newAddress) {
    updateActions.push({
      action: 'setDefaultBillingAddress',
      addressId: customer.addresses.at(-1)?.id,
    });
  }

  if (formData.setAsDefaultShipping_newAddress) {
    updateActions.push({
      action: 'setDefaultShippingAddress',
      addressId: customer.addresses.at(-1)?.id,
    });
  }

  const options: MyCustomerUpdate = {
    version: customer.version,
    actions: updateActions,
  };

  const response = await client.me().post({ body: options }).execute();

  return response.body;
}

export default setTagsToNewAddress;
