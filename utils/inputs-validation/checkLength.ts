import { errorPositiveNumMessage } from './types';

function checkLength(inputString: string, minLength: number): boolean {
  if (minLength < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  const regex = new RegExp(`^.{${minLength},}$`);
  return regex.test(inputString);
}

export default checkLength;
