export type FieldType = {
  password: string;
  email: string;
};

export enum Placeholders {
  Email = 'your.email@gmail.com',
  Password = 'securePassword1!',
}

// export enum ValidationMessages {
//   EmailRequired = 'Please enter your email',
//   EmailInvalid = 'The email is not valid',
//   PasswordRequired = 'Please enter your password',
//   PasswordPattern = `Your password must contain at least 8 characters, at least one uppercase and lowercase letter,
//                     digit, and special character (such as !, @, #, $, etc.)
//                     and must not start or end with a whitespace character.`,
// }

export enum EmailValidationMessages {
  required = 'Please enter your e-mail',
  invalid = 'Your e-mail is incorrectly formatted',
}

export enum PasswordValidationMessages {
  required = 'Please enter your password',
  hasWhitespaces = 'Password must not contain whitespaces',
  isShort = 'Password must have at least 8 characters',
  hasNoLowercase = 'Password must have at least 1 lowercase character',
  hasNoUppercase = 'Password must have at least 1 uppercase character',
  hasNoNumber = 'Password must have at least 1 number character',
  hasNoSpecialChar = 'Password must have at least 1 special character',
}
