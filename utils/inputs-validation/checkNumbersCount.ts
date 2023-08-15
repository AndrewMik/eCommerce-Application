import { errorPositiveNumMessage } from './types';

function hasMinimumNumbers(str: string, minCount: number): boolean {
  if (minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  const regex = new RegExp(`^(?:[^0-9]*[0-9][^0-9]*){${minCount},}$`);
  return regex.test(str);
}

export default hasMinimumNumbers;
