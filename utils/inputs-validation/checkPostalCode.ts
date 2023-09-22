import { PostalCodesKeys, PostalCodesMap } from './types';

function isCorrectPostalCode(country: PostalCodesKeys): RegExp {
  return PostalCodesMap[country];
}

export default isCorrectPostalCode;
