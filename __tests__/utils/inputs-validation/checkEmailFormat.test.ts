import isValidEmail from '../../../utils/inputs-validation/checkEmailFormat';

describe('isValidEmail', () => {
  test('returns true for valid emails', () => {
    const validEmails = [
      'test@example.com',
      'firstname.lastname@example.com',
      'email@subdomain.example.com',
      'email+filter@example.com',
    ];

    validEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  test('returns false for invalid emails', () => {
    const invalidEmails = [
      '@example.com', // Starts with @
      'test@example.com@', // Ends with @
      'test@.example.com', // @ followed by dot
      'test..test@example.com', // Contains consecutive dots
      'test@@example.com', // Contains consecutive @s
      'test@example', // Missing top-level domain
      'test@.com', // Domain name starts with dot
    ];

    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});
