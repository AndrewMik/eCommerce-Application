function isValidEmail(): RegExp {
  // eslint-disable-next-line no-useless-escape
  return /^(?!@)(?!.*@$)(?!.*@\.)[^@]+@[^@\.]+(\.[^@\.]+)+$/;
}

export default isValidEmail;
