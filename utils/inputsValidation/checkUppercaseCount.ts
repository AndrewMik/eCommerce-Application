import { errorPositiveNumMessage } from './types';

function hasMinimumUppercase(str: string, minCount: number): boolean {
  if (minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  const regex = new RegExp(`^(?:[^A-Z]*[A-Z][^A-Z]*){${minCount},}$`);
  return regex.test(str);
}

export default hasMinimumUppercase;
