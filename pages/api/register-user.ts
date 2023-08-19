import { CustomerDraft } from '@commercetools/platform-sdk';
import { getCode } from 'country-list';
import Client from './client';
import { AddressFieldsName, FormData } from '../../components/registration-form/helpers/registration.types';
import { getSalutation, getBirthDate } from '../../components/registration-form/helpers/helper-functions';

const getDefaultBillingAddress = (formData: FormData) => {
  if (formData.useAsBillingAddress) {
    return formData.setAsDefault_shipping ? 0 : undefined;
  }

  return formData.setAsDefault_billing ? 1 : undefined;
};

const createAddress = (formData: FormData, type: 'shipping' | 'billing') => ({
  country: getCode(formData[`${AddressFieldsName.COUNTRY}_${type}`]) as string,
  streetName: formData[`${AddressFieldsName.STREET_NAME}_${type}`],
  streetNumber: formData[`${AddressFieldsName.STREET_NUMBER}_${type}`],
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

  const client = new Client().clientCredentialsClient;

  try {
    const respose = await client.customers().post({ body: customerDraft }).execute();
    const token = await Client.token.get();
    return { statusCode: respose.statusCode, token: token.token };
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return { statusCode: errorResponse.code };
  }
}

export default registerUser;
