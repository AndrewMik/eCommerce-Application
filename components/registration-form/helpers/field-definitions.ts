import { AddressFieldsName } from './registration.types';

const fieldDefinitions = {
  name: {
    label: `Name`,
    name: `firstName`,
    placeholder: `John`,
  },
  surname: {
    label: `Surname`,
    name: `lastName`,
    placeholder: `Doe`,
  },
  birthDate: {
    label: `Date of Birth`,
    name: `dateOfBirth`,
    placeholder: `1990-03-20`,
  },
  gender: {
    label: `Gender`,
    name: `gender`,
    placeholder: `Select Gender`,
  },
  street: {
    label: `Street`,
    name: `${AddressFieldsName.STREET_NAME}`,
    placeholder: `Park Avenue`,
  },
  streetNumber: {
    label: `Street Number`,
    name: `${AddressFieldsName.STREET_NUMBER}`,
    placeholder: `34`,
  },
  apartment: {
    label: `Apartment`,
    name: `${AddressFieldsName.APARTMENT}`,
    placeholder: `128`,
  },
  country: {
    label: `Country`,
    name: `${AddressFieldsName.COUNTRY}`,
    placeholder: `Select Country`,
  },
  postalCode: {
    label: `Postal code`,
    name: `${AddressFieldsName.POSTAL_CODE}`,
    placeholder: `4701`,
  },
  defaultAddress: {
    label: `Set as default address`,
  },
  email: {
    label: `Email`,
    name: `email`,
    placeholder: `your.email@gmail.com`,
  },
  password: {
    label: `Password`,
    name: `password`,
    placeholder: `securePassword1!`,
  },
};

export default fieldDefinitions;
