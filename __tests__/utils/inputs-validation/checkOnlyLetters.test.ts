import hasOnlyLetters from '../../../utils/inputs-validation/checkOnlyLetters';

describe('hasOnlyLetters', () => {
  test('returns true for strings containing only letters and spaces', () => {
    expect(hasOnlyLetters('HelloWorld')).toBe(true);
    expect(hasOnlyLetters('Hello World')).toBe(true);
    expect(hasOnlyLetters('HELLO')).toBe(true);
    expect(hasOnlyLetters('hello')).toBe(true);
    expect(hasOnlyLetters('hElLo WoRlD')).toBe(true);
    expect(hasOnlyLetters(' ')).toBe(true); // Only spaces
  });

  test('returns false for strings containing non-letter characters', () => {
    expect(hasOnlyLetters('Hello123')).toBe(false);
    expect(hasOnlyLetters('Hello-World')).toBe(false);
    expect(hasOnlyLetters('Hello_World')).toBe(false);
    expect(hasOnlyLetters('!Hello')).toBe(false);
    expect(hasOnlyLetters('Hello!')).toBe(false);
  });
});
