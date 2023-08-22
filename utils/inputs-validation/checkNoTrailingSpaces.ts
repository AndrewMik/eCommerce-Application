function hasNoTrailingSpaces(str: string): boolean {
  const regex = /^\s+|\s+$/;
  return !regex.test(str);
}

export default hasNoTrailingSpaces;
