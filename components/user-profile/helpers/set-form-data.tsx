import { Address, Customer } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import { FormInstance } from 'antd/lib/form';
import { AddressSuffix, AddressFieldsName } from '../../registration-form/helpers/registration.types';
import { getGender } from '../../registration-form/helpers/helper-functions';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function getAddressDetails(
  form: FormInstance,
  addresses: Address[],
  id: string | string[] | undefined,
  suffix: string,
  defaultAddressID: string | undefined,
) {
  if (id) {
    addresses.forEach((address) => {
      if (address.id === id || id.includes(address.id as string)) {
        const isDefault = address.id === defaultAddressID;

        form.setFieldsValue({
          [`${AddressFieldsName.COUNTRY}${suffix}`]: regionNames.of(address.country),
          [`${AddressFieldsName.POSTAL_CODE}${suffix}`]: address.postalCode,
          [`${AddressFieldsName.CITY}${suffix}`]: address.city,
          [`${AddressFieldsName.STREET}${suffix}`]: address.streetName,
          [`${AddressFieldsName.BUILDING}${suffix}`]: address.building,
          [`${AddressFieldsName.APARTMENT}${suffix}`]: address.apartment,
          [`${AddressFieldsName.SET_AS_DEFAULT}${suffix}`]: isDefault,
        });
      }
    });
  }
}

export default function setFormData(form: FormInstance, customer: Customer) {
  form.setFieldsValue({
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: dayjs(customer.dateOfBirth),
    dateOfBirthProfile: customer.dateOfBirth,
    gender: getGender(customer.salutation),
  });

  getAddressDetails(
    form,
    customer.addresses,
    customer.shippingAddressIds,
    AddressSuffix.SHIPPING,
    customer.defaultShippingAddressId,
  );

  getAddressDetails(
    form,
    customer.addresses,
    customer.billingAddressIds,
    AddressSuffix.BILLING,
    customer.defaultBillingAddressId,
  );
}
