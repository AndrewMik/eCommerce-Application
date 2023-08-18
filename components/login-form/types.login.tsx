export type FieldType = {
  password: string;
  email: string;
};

export enum Placeholders {
  Email = 'your.email@gmail.com',
  Password = 'Password',
}

export enum ValidationMessages {
  EmailRequired = 'Please enter your email',
  EmailInvalid = 'The email is not valid',
  PasswordRequired = 'Please enter your password',
  PasswordPattern = `Your password must contain at least 8 characters, at least one uppercase and lowercase letter, 
                    digit, and special character (such as !, @, #, $, etc.) 
                    and must not start or end with a whitespace character.`,
}
