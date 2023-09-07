import moment from 'moment';

export function getBirthDate(date: moment.Moment): string {
  return date.format().slice(0, 10);
}

export function getSalutation(gender: string): string {
  if (gender === 'Male') {
    return 'Mr.';
  }
  if (gender === 'Female') {
    return 'Ms.';
  }
  return '';
}

export function getGender(salutation: string | undefined): string {
  if (salutation === 'Mr.') {
    return 'Male';
  }
  if (salutation === 'Ms.') {
    return 'Female';
  }
  return '';
}
