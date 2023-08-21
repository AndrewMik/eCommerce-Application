import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputField from '../../../../components/registration-form/fields/input-field';

jest.mock('antd', () => ({
  Form: {
    Item: ({ children, label, required }: { children: React.ReactNode; label: string; required: boolean }) => (
      <div data-testid="mocked-form-item" data-required={required}>
        <label data-testid="mocked-label">{label}</label>
        {children}
      </div>
    ),
  },
  Input: ({ placeholder }: { placeholder: string }) => (
    <input data-testid="mocked-input" placeholder={placeholder} type="text" />
  ),
}));

describe('InputField', () => {
  it('renders correctly with given props', () => {
    const testProps = {
      label: 'Test Label',
      name: 'testName',
      placeholder: 'Enter something...',
      rules: [],
    };

    render(<InputField {...testProps} />);

    const inputElement = screen.getByTestId('mocked-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', testProps.placeholder);

    const labelElement = screen.getByTestId('mocked-label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(testProps.label);

    const formItem = screen.getByTestId('mocked-form-item');
    expect(formItem).toHaveAttribute('data-required', 'false');
  });

  it('sets required attribute when required prop is provided', () => {
    const testProps = {
      label: 'Test Label',
      name: 'testName',
      placeholder: 'Enter something...',
      rules: [],
      required: true,
    };

    render(<InputField {...testProps} />);

    const formItem = screen.getByTestId('mocked-form-item');
    expect(formItem).toHaveAttribute('data-required', 'true');
  });
});
