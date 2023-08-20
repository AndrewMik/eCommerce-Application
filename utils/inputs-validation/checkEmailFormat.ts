function isValidEmail(email: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(?!@)(?!.*@$)(?!.*@\.)((?![@.]{2}).)*@[^@\.]+(\.[^@\.]+)+$/;
  return regex.test(email);
}

export default isValidEmail;
