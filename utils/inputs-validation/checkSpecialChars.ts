import { errorPositiveNumMessage } from './types';

function hasSpecialCharacters(inputString: string, minCount: number): boolean {
  if (minCount < 1) {
    throw new Error(errorPositiveNumMessage);
  }

  const regex = new RegExp(`[^\\w\\d\\s]{${minCount},}`);
  return regex.test(inputString);
}

export default hasSpecialCharacters;
