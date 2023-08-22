import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectField from '../../../../components/registration-form/fields/select-field';

jest.mock('antd', () => {
  const actualAntd = jest.requireActual('antd');

  const MockedSelect = ({ children, placeholder }: { children?: ReactNode; placeholder?: string }) => (
    <div data-testid="mocked-select" data-placeholder={placeholder}>
      <span>{placeholder}</span>
      {children}
    </div>
  );

  MockedSelect.Option = ({ children, value }: { children?: ReactNode; value?: string }) => (
    <div data-testid={`option-${value}`} data-value={value}>
      {children}
    </div>
  );

  return {
    ...actualAntd,
    Form: {
      Item: ({ children }: { children?: ReactNode }) => <div data-testid="form-item">{children}</div>,
    },
    Select: MockedSelect,
  };
});

describe('SelectField', () => {
  it('renders correctly with given props', () => {
    const testProps = {
      label: 'Test Label',
      name: 'testName',
      placeholder: 'Choose...',
      rules: [],
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
    };

    render(<SelectField {...testProps} />);

    expect(screen.getByTestId('form-item')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-select')).toBeInTheDocument();

    testProps.options.forEach((option) => {
      expect(screen.getByTestId(`option-${option.value}`)).toHaveTextContent(option.label);
    });
  });
});
