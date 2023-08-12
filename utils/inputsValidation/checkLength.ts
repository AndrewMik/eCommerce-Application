import { errorPositiveNumMessage } from './types';

function checkLength(minLength: number): RegExp {
  if (minLength < 1) {
    throw new Error(errorPositiveNumMessage);
  }
  return new RegExp(`^.{${minLength},}$`);
}

export default checkLength;
