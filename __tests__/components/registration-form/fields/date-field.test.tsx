import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import DateField from '../../../../components/registration-form/fields/date-field';

type DatePickerProps = {
  disabledDate?: (currentDate: moment.Moment | null) => boolean;
};

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  function mockedMoment(...args: any[]): typeof originalMoment {
    return originalMoment(...args);
  }
  return Object.assign(mockedMoment, originalMoment);
});

jest.mock('antd', () => {
  const actualMoment = jest.requireActual('moment');

  return {
    Form: {
      Item: () => <div data-testid="form-item"></div>,
    },
    DatePicker: ({ disabledDate }: DatePickerProps) => {
      const futureDate = actualMoment().add(1, 'days');
      const isFutureDateDisabled = disabledDate ? disabledDate(futureDate) : false;
      return <input data-testid="date-picker" data-disabled={isFutureDateDisabled} />;
    },
  };
});

test('renders DateField correctly', () => {
  render(<DateField label="Test Date" name="testDate" placeholder="Select a date" rules={[]} />);

  expect(screen.getByTestId('form-item')).toBeInTheDocument();
});
