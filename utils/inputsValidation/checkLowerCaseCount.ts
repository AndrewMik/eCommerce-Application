import { errorPositiveNumMessage } from './types';

function lowercaseCount(minCount: number): RegExp {
  if (minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  return new RegExp(`^(?:[^a-z]*[a-z][^a-z]*){${minCount},}$`);
}

export default lowercaseCount;
