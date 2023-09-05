export enum AddressFieldsName {
  COUNTRY = 'country',
  CITY = 'city',
  STREET = 'street',
  BUILDING = 'building',
  APARTMENT = 'apartment',
  POSTAL_CODE = 'postalCode',
  SET_AS_DEFAULT = 'setAsDefault',
  SET_AS_DEFAULT_SHIPPING = 'setAsDefaultShipping',
  SET_AS_DEFAULT_BILLING = 'setAsDefaultBilling',
  SET_AS_SHIPPING = 'setAsShipping',
  SET_AS_BILLING = 'setAsBilling',
  USE_AS_BILLING_ADDRESS = 'useAsBillingAddress',
  ADDRESS_ID = 'addressId',
}

export enum AddressSuffix {
  SHIPPING = '_shipping',
  BILLING = '_billing',
}

export enum ShippingFieldsName {
  COUNTRY = `${AddressFieldsName.COUNTRY}${AddressSuffix.SHIPPING}`,
  CITY = `${AddressFieldsName.CITY}${AddressSuffix.SHIPPING}`,
  STREET = `${AddressFieldsName.STREET}${AddressSuffix.SHIPPING}`,
  BUILDING = `${AddressFieldsName.BUILDING}${AddressSuffix.SHIPPING}`,
  APARTMENT = `${AddressFieldsName.APARTMENT}${AddressSuffix.SHIPPING}`,
  POSTAL_CODE = `${AddressFieldsName.POSTAL_CODE}${AddressSuffix.SHIPPING}`,
}

export enum BillingFieldsName {
  COUNTRY = `${AddressFieldsName.COUNTRY}${AddressSuffix.BILLING}`,
  CITY = `${AddressFieldsName.CITY}${AddressSuffix.BILLING}`,
  STREET = `${AddressFieldsName.STREET}${AddressSuffix.BILLING}`,
  BUILDING = `${AddressFieldsName.BUILDING}${AddressSuffix.BILLING}`,
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
  [ShippingFieldsName.CITY]: string;
  [ShippingFieldsName.STREET]: string;
  [ShippingFieldsName.BUILDING]: string;
  [ShippingFieldsName.APARTMENT]: string;
  [ShippingFieldsName.POSTAL_CODE]: string;
  [BillingFieldsName.COUNTRY]: string;
  [BillingFieldsName.CITY]: string;
  [BillingFieldsName.STREET]: string;
  [BillingFieldsName.BUILDING]: string;
  [BillingFieldsName.APARTMENT]: string;
  [BillingFieldsName.POSTAL_CODE]: string;
  gender: string;
  useAsBillingAddress: boolean;
  setAsDefault_shipping: boolean;
  setAsDefault_billing: boolean;
};

export type FormDataAddNewAddress = {
  apartment_newAddress: string;
  building_newAddress: string;
  city_newAddress: string;
  country_newAddress: string;
  postalCode_newAddress: string;
  setAsBilling_newAddress: boolean;
  setAsDefaultBilling_newAddress: boolean;
  setAsDefaultShipping_newAddress: boolean;
  setAsShipping_newAddress: boolean;
  street_newAddress: string;
};

export type State = {
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
};
