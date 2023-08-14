function isValidEmail(email: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(?!@)(?!.*@$)(?!.*@\.)[^@]+@[^@\.]+(\.[^@\.]+)+$/;
  return regex.test(email);
}

export default isValidEmail;
