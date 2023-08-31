import { Customer, CustomerDraft, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { getCode } from 'country-list';
import { FormInstance } from 'antd';
import { getBirthDate, getSalutation } from '@/components/registration-form/helpers/helper-functions';
import { AddressFieldsName, FormData } from '../../components/registration-form/helpers/registration.types';
import Client from './client';

// I decided not to use useAsBillingAddress on this page, so it should be deleted, needs logic with address IDs
const getDefaultBillingAddress = (formData: FormData) => {
  if (formData.useAsBillingAddress) {
    return formData.setAsDefault_shipping ? 0 : undefined;
  }

  return formData.setAsDefault_billing ? 1 : undefined;
};

const createAddress = (formData: FormData, type: 'shipping' | 'billing') => ({
  country: getCode(formData[`${AddressFieldsName.COUNTRY}_${type}`]) as string,
  city: formData[`${AddressFieldsName.CITY}_${type}`],
  streetName: formData[`${AddressFieldsName.STREET}_${type}`],
  building: formData[`${AddressFieldsName.BUILDING}_${type}`],
  apartment: formData[`${AddressFieldsName.APARTMENT}_${type}`],
  postalCode: formData[`${AddressFieldsName.POSTAL_CODE}_${type}`],
});

// many lines of code on this page were taken from registration, should be refactored
async function updateCustomer(customerData: Customer, form: FormInstance, formData: FormData) {
  const customerDraft: CustomerDraft = {
    email: formData.email,
    password: formData.password,
    salutation: getSalutation(formData.gender),
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: getBirthDate(formData.dateOfBirth),
    addresses: [createAddress(formData, 'shipping')],
    shippingAddresses: [0],
    billingAddresses: formData.useAsBillingAddress ? [0] : [1],
    defaultShippingAddress: formData.setAsDefault_shipping ? 0 : undefined,
    defaultBillingAddress: getDefaultBillingAddress(formData),
  };

  if (!formData.useAsBillingAddress) {
    customerDraft.addresses?.push(createAddress(formData, 'billing'));
  }

  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  // you should get version from incoming customer data and add actions for update https://docs.commercetools.com/api/projects/me-profile
  const options: MyCustomerUpdate = {
    version: 1,
    actions: [],
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
