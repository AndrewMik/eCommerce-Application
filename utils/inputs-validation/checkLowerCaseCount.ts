import { errorPositiveNumMessage } from './types';

function hasMinimumLowercase(str: string, minCount: number): boolean {
  if (minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  const regex = new RegExp(`^(?:[^a-z]*[a-z][^a-z]*){${minCount},}$`);
  return regex.test(str);
}

export default hasMinimumLowercase;
