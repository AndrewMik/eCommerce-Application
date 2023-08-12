import { PostalCodesKeys, PostalCodesMap } from './types';

function isCorrectPostalCode(country: PostalCodesKeys): RegExp {
  return PostalCodesMap[country];
}

export default isCorrectPostalCode;

// TODO: instead of using static list of countries, write a function to get a list of countries where the store delivers from CommerceTools
