import { Address, Customer } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import { FormInstance } from 'antd/lib/form';
import { AddressFieldsName } from '../../registration-form/helpers/registration.types';
import { getGender } from '../../registration-form/helpers/helper-functions';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function getAddressDetails(
  form: FormInstance,
  addresses: Address[],
  shippingIds: string[],
  billingIds: string[],
  defaultShippingId: string,
  defaultBillingId: string,
) {
  addresses.forEach((address) => {
    // eslint-disable-next-line no-console
    console.log('address after if', address);
    form.setFieldsValue({
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
    });
  });
}

export default function setFormData(form: FormInstance, customer: Customer) {
  form.setFieldsValue({
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: dayjs(customer.dateOfBirth),
    dateOfBirthProfile: customer.dateOfBirth,
    gender: getGender(customer.salutation),
    email: customer.email,
  });

  getAddressDetails(
    form,
    customer.addresses,
    customer.shippingAddressIds ?? [],
    customer.billingAddressIds ?? [],
    customer.defaultShippingAddressId ?? '',
    customer.defaultBillingAddressId ?? '',
  );
}
