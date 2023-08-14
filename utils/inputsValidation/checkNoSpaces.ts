function hasNoSpaces(str: string): boolean {
  const regex = /^[^\s]*$/;
  return regex.test(str);
}

export default hasNoSpaces;
