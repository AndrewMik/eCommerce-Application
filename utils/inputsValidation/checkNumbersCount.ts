import { errorPositiveNumMessage } from './types';

function numbersCount(minCount: number): RegExp {
  if (typeof minCount !== 'number' || minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  return new RegExp(`^(?:[^0-9]*[0-9][^0-9]*){${minCount},}$`);
}

export default numbersCount;
