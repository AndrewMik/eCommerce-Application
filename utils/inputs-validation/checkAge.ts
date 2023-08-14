import { errorPositiveNumMessage } from './types';

function isCertainAge(dateOfBirth: string, minAge: number): boolean {
  if (minAge < 0) {
    throw new Error(errorPositiveNumMessage);
  }
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age >= minAge;
}

export default isCertainAge;

// Date from DatePicker component is retrieved in format 'YYYY-MM-DD' (dateString)
