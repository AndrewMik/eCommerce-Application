export type FieldType = {
  password: string;
  email: string;
};

export enum Placeholders {
  Email = 'your.email@gmail.com',
  Password = 'securePassword1!',
}

export enum EmailValidationMessages {
  required = 'Please enter your e-mail',
  invalid = 'Your e-mail is incorrectly formatted',
}

export enum PasswordValidationMessages {
  required = 'Please enter your password',
  hasWhitespaces = 'Password must not contain leading or trailing whitespaces',
  isShort = 'Password must have at least 8 characters',
  hasNoLowercase = 'Password must have at least 1 lowercase character',
  hasNoUppercase = 'Password must have at least 1 uppercase character',
  hasNoNumber = 'Password must have at least 1 number character',
  hasNoSpecialChar = 'Password must have at least 1 special character',
}
