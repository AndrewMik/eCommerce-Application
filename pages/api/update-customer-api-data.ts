import {
  Address,
  BaseAddress,
  Customer,
  MyCustomerChangeAddressAction,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { getCode } from 'country-list';
import { getBirthDate, getSalutation } from '@/components/registration-form/helpers/helper-functions';
import { AddressFieldsName, FormData } from '../../components/registration-form/helpers/registration.types';
import Client from './client';

type AddressData = {
  country?: string;
  postalCode?: string;
  city?: string;
  streetName?: string;
  building?: string;
  apartment?: string;
};

function getAddressUpdateActions(customerData: Customer, formData: FormData) {
  const addressUpdateActions: MyCustomerChangeAddressAction[] = [];
  const tagActions: MyCustomerUpdateAction[] = [];

  customerData?.addresses.forEach((address) => {
    const addressActions: AddressData = {};
    const keys = {
      country: `${AddressFieldsName.COUNTRY}_${address.id}` as keyof FormData,
      postalCode: `${AddressFieldsName.POSTAL_CODE}_${address.id}` as keyof FormData,
      city: `${AddressFieldsName.CITY}_${address.id}` as keyof FormData,
      streetName: `${AddressFieldsName.STREET}_${address.id}` as keyof FormData,
      building: `${AddressFieldsName.BUILDING}_${address.id}` as keyof FormData,
      apartment: `${AddressFieldsName.APARTMENT}_${address.id}` as keyof FormData,
    };

    if (formData[`setAsDefaultBilling_${address.id}` as keyof FormData]) {
      tagActions.push({
        action: `setDefaultBillingAddress`,
        addressId: address.id,
      });
    }

    if (formData[`setAsDefaultShipping_${address.id}` as keyof FormData]) {
      tagActions.push({
        action: `setDefaultShippingAddress`,
        addressId: address.id,
      });
    }

    if (formData[`setAsBilling_${address.id}` as keyof FormData]) {
      tagActions.push({
        action: `addBillingAddressId`,
        addressId: address.id,
      });
    } else if (customerData.billingAddressIds?.includes(address.id as string)) {
      tagActions.push({
        action: 'removeBillingAddressId',
        addressId: address.id,
      });
    }

    if (formData[`setAsShipping_${address.id}` as keyof FormData]) {
      tagActions.push({
        action: `addShippingAddressId`,
        addressId: address.id,
      });
    } else if (customerData.shippingAddressIds?.includes(address.id as string)) {
      tagActions.push({
        action: 'removeShippingAddressId',
        addressId: address.id,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, formDataKey] of Object.entries(keys)) {
      let isAddressChanged = false;
      if (key === AddressFieldsName.COUNTRY) {
        const countryCode = getCode(formData[formDataKey] as string) as string;

        addressActions[key] = countryCode;

        if (countryCode !== address[key]) {
          isAddressChanged = true;
        }
      } else if (formData[formDataKey] !== address[key as keyof Address]) {
        addressActions[key as keyof AddressData] = formData[formDataKey] as string;
        isAddressChanged = true;
      } else {
        addressActions[key as keyof AddressData] = formData[formDataKey] as string;
      }

      if (isAddressChanged && addressUpdateActions[addressUpdateActions.length - 1]?.addressId !== address.id) {
        addressUpdateActions.push({
          action: 'changeAddress',
          addressId: address.id,
          address: addressActions as BaseAddress,
        });
      }
    }
  });

  return tagActions.concat(addressUpdateActions);
}

async function updateCustomerApiData(customerData: Customer, formData: FormData) {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const client = Client.getInstance().clientWithRefreshTokenFlow(refreshToken);

  const personalDataUpdateActions: MyCustomerUpdateAction[] = [
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
  ];

  const addressUpdateActions: MyCustomerUpdateAction[] = getAddressUpdateActions(customerData, formData);

  const actions = personalDataUpdateActions.concat(addressUpdateActions);

  const options: MyCustomerUpdate = {
    version: customerData.version,
    actions,
  };

  const response = await client.me().post({ body: options }).execute();
  return response;
}

export default updateCustomerApiData;
