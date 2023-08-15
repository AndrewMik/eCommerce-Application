import { Rule } from 'antd/es/form';
import { FormInstance } from 'antd/lib/form';
import postalCodes from 'postal-codes-js';
import { getCode } from 'country-list';

import hasOnlyLetters from '@/utils/inputs-validation/checkOnlyLetters';
import isCertainAge from '@/utils/inputs-validation/checkAge';
import checkLength from '@/utils/inputs-validation/checkLength';
import hasMinimumLowercase from '@/utils/inputs-validation/checkLowerCaseCount';
import hasMinimumUppercase from '@/utils/inputs-validation/checkUppercaseCount';
import hasMinimumNumbers from '@/utils/inputs-validation/checkNumbersCount';
import hasNoSpaces from '@/utils/inputs-validation/checkNoSpaces';
import hasSpecialCharacters from '@/utils/inputs-validation/checkSpecialChars';

const getNameRules = (): Rule[] => [
  {
    required: true,
    message: 'Name must have at least one character',
  },
  {
    validator: (_, value: string) => {
      if (!hasOnlyLetters(value)) {
        return Promise.reject(new Error('Name can only contain letters'));
      }
      return Promise.resolve();
    },
  },
];

const getSurnameRules = (): Rule[] => [
  {
    required: true,
    message: 'Surname must have at least one character',
  },
  {
    validator: (_, value: string) => {
      if (!hasOnlyLetters(value)) {
        return Promise.reject(new Error('Surname can only contain letters'));
      }
      return Promise.resolve();
    },
  },
];

const getBirthDateRules = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(new Error('Please input your date of birth'));
      }
      if (!isCertainAge(value, 13)) {
        return Promise.reject(new Error('You should be at least 13 years old to register'));
      }
      return Promise.resolve();
    },
  },
];

const getStreetRules = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value || value.length === 0) {
        return Promise.reject(new Error('Street name must contain at least one character'));
      }
      return Promise.resolve();
    },
  },
];

const getCountryRules = (): Rule[] => [
  {
    required: true,
    message: 'Please select the country from list',
  },
];

const getEmailRules = (): Rule[] => [
  { required: true, message: 'Please input your e-mail' },
  { type: 'email', message: 'Your e-mail is incorrectly formatted' },
];

const getPasswordRules = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(new Error('Please input your password'));
      }
      if (!hasNoSpaces(value)) {
        return Promise.reject(new Error('Password must not contain whitespaces'));
      }
      if (!checkLength(value, 8)) {
        return Promise.reject(new Error('Password must have at least 8 characters'));
      }
      if (!hasMinimumLowercase(value, 1)) {
        return Promise.reject(new Error('Password must have at least 1 lowercase character'));
      }
      if (!hasMinimumUppercase(value, 1)) {
        return Promise.reject(new Error('Password must have at least 1 uppercase character'));
      }
      if (!hasMinimumNumbers(value, 1)) {
        return Promise.reject(new Error('Password must have at least 1 number character'));
      }
      if (!hasSpecialCharacters(value, 1)) {
        return Promise.reject(new Error('Password must have at least 1 special character'));
      }
      return Promise.resolve();
    },
  },
];

const getPostalCodeRules = (form: FormInstance): Rule[] => [
  {
    validator: (_, value: string) => {
      const countryName = form.getFieldValue('country');
      const countryCode = countryName ? getCode(countryName) : null;

      if (!value) {
        return Promise.reject(new Error(`Please input postal code`));
      }
      if (!countryCode) {
        return Promise.reject(new Error(`Please choose country`));
      }
      if (postalCodes.validate(countryCode, value) !== true) {
        if (countryName) {
          return Promise.reject(new Error(`Invalid postal code format for ${countryName}`));
        }
        return Promise.reject(new Error('Invalid postal code'));
      }
      return Promise.resolve();
    },
  },
];

export {
  getNameRules,
  getSurnameRules,
  getBirthDateRules,
  getStreetRules,
  getCountryRules,
  getEmailRules,
  getPasswordRules,
  getPostalCodeRules,
};
