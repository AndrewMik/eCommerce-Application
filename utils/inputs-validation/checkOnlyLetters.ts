function hasOnlyLetters(str: string): boolean {
  const regex = /^[A-Za-z\s]*$/;
  return regex.test(str);
}

export default hasOnlyLetters;
