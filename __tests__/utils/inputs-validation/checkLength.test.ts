import checkLength from '../../../utils/inputs-validation/checkLength';
import { errorPositiveNumMessage } from '../../../utils/inputs-validation/types';

describe('checkLength', () => {
  test('returns true for strings meeting or exceeding the minimum length', () => {
    expect(checkLength('hello', 5)).toBe(true);
    expect(checkLength('hello', 3)).toBe(true);
    expect(checkLength('h', 1)).toBe(true);
  });

  test('returns false for strings shorter than the minimum length', () => {
    expect(checkLength('hello', 6)).toBe(false);
    expect(checkLength('h', 2)).toBe(false);
  });

  test('throws error when minLength is less than 1', () => {
    expect(() => checkLength('hello', 0)).toThrow(errorPositiveNumMessage);
    expect(() => checkLength('hello', -1)).toThrow(errorPositiveNumMessage);
  });
});
