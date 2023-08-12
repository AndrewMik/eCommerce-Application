import { errorPositiveNumMessage } from './types';

function uppercaseCount(minCount: number): RegExp {
  if (minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  return new RegExp(`^(?:[^A-Z]*[A-Z][^A-Z]*){${minCount},}$`);
}

export default uppercaseCount;
