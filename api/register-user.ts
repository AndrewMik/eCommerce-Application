import { CustomerDraft } from '@commercetools/platform-sdk';
import Client from './client';
import { getCode } from 'country-list';
import {
  ShippingFieldsName,
  BillingFieldsName,
  FormData,
} from '../components/registration-form/helpers/registration.types';
import { getSalutation, getBirthDate } from '../components/registration-form/helpers/helper-functions';

async function registerUser(formData: FormData) {
  const customerDraft: CustomerDraft = {
    email: formData.email,
    password: formData.password,
    salutation: getSalutation(formData.gender),
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: getBirthDate(formData.dateOfBirth),
    addresses: [
      {
        country: getCode(formData.country_shipping) as string,
        streetName: formData[ShippingFieldsName.STREET_NAME],
        streetNumber: formData[ShippingFieldsName.STREET_NUMBER],
        apartment: formData[ShippingFieldsName.APARTMENT],
        postalCode: formData[ShippingFieldsName.POSTAL_CODE],
      },
    ],
    shippingAddresses: [0],
    billingAddresses: formData.useAsBillingAddress ? [0] : [1],
    defaultShippingAddress: formData.setAsDefault_shipping ? 0 : undefined,
    defaultBillingAddress: formData.useAsBillingAddress
      ? formData.setAsDefault_shipping
        ? 0
        : undefined
      : formData.setAsDefault_billing
      ? 1
      : undefined,
  };

  if (!formData.useAsBillingAddress) {
    customerDraft.addresses?.push({
      country: getCode(formData.country_billing) as string,
      streetName: formData[BillingFieldsName.STREET_NAME],
      streetNumber: formData[BillingFieldsName.STREET_NUMBER],
      apartment: formData[BillingFieldsName.APARTMENT],
      postalCode: formData[BillingFieldsName.POSTAL_CODE],
    });
  }

  const client = new Client().clientCredentialsClient;

  try {
    const respose = await client.customers().post({ body: customerDraft }).execute();
    return respose.statusCode;
  } catch (error) {
    const errorResponse = JSON.parse(JSON.stringify(error));
    return errorResponse.code;
  }
}

export default registerUser;
