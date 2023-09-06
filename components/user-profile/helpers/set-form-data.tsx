import { Address, Customer } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import { FormInstance } from 'antd/lib/form';
import { AddressFieldsName } from '../../registration-form/helpers/registration.types';
import { getGender } from '../../registration-form/helpers/helper-functions';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function getAddressDetails(
  addresses: Address[],
  shippingIds: string[],
  billingIds: string[],
  defaultShippingId: string,
  defaultBillingId: string,
) {
  return addresses?.map((address) => {
    return {
      [`${AddressFieldsName.COUNTRY}_${address.id}`]: regionNames.of(address.country),
      [`${AddressFieldsName.POSTAL_CODE}_${address.id}`]: address.postalCode,
      [`${AddressFieldsName.CITY}_${address.id}`]: address.city,
      [`${AddressFieldsName.STREET}_${address.id}`]: address.streetName,
      [`${AddressFieldsName.BUILDING}_${address.id}`]: address.building,
      [`${AddressFieldsName.APARTMENT}_${address.id}`]: address.apartment,
      [`${AddressFieldsName.ADDRESS_ID}_${address.id}`]: address.id,
      [`${AddressFieldsName.SET_AS_DEFAULT_SHIPPING}_${address.id}`]: address.id === defaultShippingId,
      [`${AddressFieldsName.SET_AS_DEFAULT_BILLING}_${address.id}`]: address.id === defaultBillingId,
      [`${AddressFieldsName.SET_AS_SHIPPING}_${address.id}`]: shippingIds.includes(address.id ?? ''),
      [`${AddressFieldsName.SET_AS_BILLING}_${address.id}`]: billingIds.includes(address.id ?? ''),
    };
  });
}

export default function setFormData(form: FormInstance, customer: Customer) {
  const addresses = getAddressDetails(
    customer.addresses,
    customer.shippingAddressIds ?? [],
    customer.billingAddressIds ?? [],
    customer.defaultShippingAddressId ?? '',
    customer.defaultBillingAddressId ?? '',
  );

  form.setFieldsValue({
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: dayjs(customer.dateOfBirth),
    dateOfBirthProfile: customer.dateOfBirth,
    gender: getGender(customer.salutation),
    email: customer.email,
    ...addresses.reduce((acc, address) => ({ ...acc, ...address }), {}),
  });
}
