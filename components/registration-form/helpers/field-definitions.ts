import { AddressFieldsName } from './registration.types';

const fieldDefinitions = {
  name: {
    label: 'Name',
    name: 'firstName',
    placeholder: 'John',
  },
  surname: {
    label: 'Surname',
    name: 'lastName',
    placeholder: 'Doe',
  },
  birthDate: {
    label: 'Date of Birth',
    name: 'dateOfBirth',
    placeholder: '1990-03-20',
  },
  birthDateOnUserProfile: {
    label: 'Date of Birth',
    name: 'dateOfBirthProfile',
    placeholder: '1990-03-20',
  },
  gender: {
    label: 'Gender',
    name: 'gender',
    placeholder: 'Select Gender',
  },
  city: {
    label: 'City',
    name: `${AddressFieldsName.CITY}`,
    placeholder: 'New York',
  },
  street: {
    label: 'Street',
    name: `${AddressFieldsName.STREET}`,
    placeholder: 'Park Avenue',
  },
  building: {
    label: 'Building',
    name: `${AddressFieldsName.BUILDING}`,
    placeholder: '34',
  },
  apartment: {
    label: 'Apartment',
    name: `${AddressFieldsName.APARTMENT}`,
    placeholder: '128',
  },
  country: {
    label: 'Country',
    name: `${AddressFieldsName.COUNTRY}`,
    placeholder: 'Select Country',
  },
  postalCode: {
    label: 'Postal code',
    name: `${AddressFieldsName.POSTAL_CODE}`,
    placeholder: '4701',
  },
  addressShipping: {
    label: 'Set as shipping',
  },
  addressBilling: {
    label: 'Set as billing',
  },
  defaultAddress: {
    label: 'Set as default address',
  },
  defaultShippingAddress: {
    label: 'Set as default shipping',
  },
  defaultBillingAddress: {
    label: 'Set as default billing',
  },
  email: {
    label: 'Email',
    name: 'email',
    placeholder: 'your.email@gmail.com',
  },
  password: {
    label: 'Password',
    name: 'password',
    placeholder: 'securePassword1!',
  },
};

export default fieldDefinitions;
