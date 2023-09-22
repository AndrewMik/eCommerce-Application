import { CustomerDraft } from '@commercetools/platform-sdk';
import { getCode } from 'country-list';
import Client from './client';
import { AddressFieldsName, FormData } from '../../components/registration-form/helpers/registration.types';
import { getSalutation, getBirthDate } from '../../components/registration-form/helpers/helper-functions';
import loginUser from './login-user';

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

async function registerUser(formData: FormData) {
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

  const client = Client.getInstance().clientCredentialsClient;

  try {
    const response = await client.customers().post({ body: customerDraft }).execute();

    let loginResponse;

    if (response.statusCode === 201) {
      loginResponse = await loginUser(customerDraft.email, customerDraft.password as string);
    }

    if (loginResponse === undefined) {
      throw new Error('unable to login');
    }

    return { statusCode: loginResponse.statusCode, token: loginResponse.token };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return { statusCode: errorResponse.code };
  }
}

export default registerUser;
