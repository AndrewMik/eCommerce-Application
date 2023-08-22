import hasMinimumLowercase from '../../../utils/inputs-validation/checkLowerCaseCount';
import { errorPositiveNumMessage } from '../../../utils/inputs-validation/types';

describe('hasMinimumLowercase', () => {
  test('returns true for strings with at least the specified number of lowercase characters', () => {
    expect(hasMinimumLowercase('HelloWorld', 5)).toBe(true);
    expect(hasMinimumLowercase('HELLOwORLD', 1)).toBe(true);
    expect(hasMinimumLowercase('HeLLoWOrLD', 3)).toBe(true);
  });

  test('returns false for strings with fewer lowercase characters than specified', () => {
    expect(hasMinimumLowercase('HELLOWORLD', 1)).toBe(false);
    expect(hasMinimumLowercase('HelloWorld', 10)).toBe(false);
  });

  test('throws error when minCount is less than 1', () => {
    expect(() => hasMinimumLowercase('HelloWorld', 0)).toThrow(errorPositiveNumMessage);
    expect(() => hasMinimumLowercase('HelloWorld', -1)).toThrow(errorPositiveNumMessage);
  });
});
