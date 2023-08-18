import moment from 'moment';

export function getBirthDate(date: moment.Moment): string {
  return date.format().slice(0, 10);
}

export function getSalutation(gender: string): string {
  if (gender === 'male') {
    return 'Mr.';
  }
  if (gender === 'female') {
    return 'Ms.';
  }
  return '';
}
