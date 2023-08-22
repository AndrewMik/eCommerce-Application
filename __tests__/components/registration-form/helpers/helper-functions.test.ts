import moment from 'moment';
import { getBirthDate, getSalutation } from '../../../../components/registration-form/helpers/helper-functions';

describe('Utilities', () => {
  describe('getBirthDate', () => {
    it('should format date to "YYYY-MM-DD"', () => {
      const date = moment('2022-05-01T15:30:00Z');
      const result = getBirthDate(date);
      expect(result).toBe('2022-05-01');
    });
  });

  describe('getSalutation', () => {
    it('should return "Mr." for male', () => {
      const result = getSalutation('male');
      expect(result).toBe('Mr.');
    });

    it('should return "Ms." for female', () => {
      const result = getSalutation('female');
      expect(result).toBe('Ms.');
    });

    it('should return an empty string for any other value', () => {
      const result = getSalutation('other');
      expect(result).toBe('');
    });
  });
});
