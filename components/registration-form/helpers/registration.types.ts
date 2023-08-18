export enum AddressFieldsName {
  COUNTRY = `country`,
  STREET_NAME = `streetName`,
  STREET_NUMBER = `streetNumber`,
  APARTMENT = `apartment`,
  POSTAL_CODE = `postalCode`,
  SET_AS_DEFAULT = `setAsDefault`,
  USE_AS_BILLING_ADDRESS = `useAsBillingAddress`,
}

export enum AddressSuffix {
  SHIPPING = `_shipping`,
  BILLING = `_billing`,
}

export enum ShippingFieldsName {
  COUNTRY = `${AddressFieldsName.COUNTRY}${AddressSuffix.SHIPPING}`,
  STREET_NAME = `${AddressFieldsName.STREET_NAME}${AddressSuffix.SHIPPING}`,
  STREET_NUMBER = `${AddressFieldsName.STREET_NUMBER}${AddressSuffix.SHIPPING}`,
  APARTMENT = `${AddressFieldsName.APARTMENT}${AddressSuffix.SHIPPING}`,
  POSTAL_CODE = `${AddressFieldsName.POSTAL_CODE}${AddressSuffix.SHIPPING}`,
}

export enum BillingFieldsName {
  COUNTRY = `${AddressFieldsName.COUNTRY}${AddressSuffix.BILLING}`,
  STREET_NAME = `${AddressFieldsName.STREET_NAME}${AddressSuffix.BILLING}`,
  STREET_NUMBER = `${AddressFieldsName.STREET_NUMBER}${AddressSuffix.BILLING}`,
  APARTMENT = `${AddressFieldsName.APARTMENT}${AddressSuffix.BILLING}`,
  POSTAL_CODE = `${AddressFieldsName.POSTAL_CODE}${AddressSuffix.BILLING}`,
}

export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: moment.Moment;
  [ShippingFieldsName.COUNTRY]: string;
  [ShippingFieldsName.STREET_NAME]: string;
  [ShippingFieldsName.STREET_NUMBER]: string;
  [ShippingFieldsName.APARTMENT]: string;
  [ShippingFieldsName.POSTAL_CODE]: string;
  [BillingFieldsName.COUNTRY]: string;
  [BillingFieldsName.STREET_NAME]: string;
  [BillingFieldsName.STREET_NUMBER]: string;
  [BillingFieldsName.APARTMENT]: string;
  [BillingFieldsName.POSTAL_CODE]: string;
  gender: string;
  useAsBillingAddress: boolean;
  setAsDefault_shipping: boolean;
  setAsDefault_billing: boolean;
};
