import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SwitchField from '../../../../components/registration-form/fields/switch-field';

jest.mock('antd', () => ({
  Form: {
    Item: ({ children }: { children: React.ReactNode }) => <div data-testid="mocked-form-item">{children}</div>,
  },
  Switch: ({ defaultChecked }: { defaultChecked?: boolean }) => (
    <input type="checkbox" data-testid="mocked-switch" defaultChecked={defaultChecked} />
  ),
}));

describe('SwitchField', () => {
  it('renders correctly with given props', () => {
    const testProps = {
      name: 'testSwitch',
      label: 'Test Switch Label',
    };

    render(<SwitchField {...testProps} />);

    expect(screen.getByTestId('mocked-form-item')).toBeInTheDocument();

    const switchElement = screen.getByTestId('mocked-switch') as HTMLInputElement;

    expect(switchElement).toBeInTheDocument();
    expect(switchElement.defaultChecked).toBe(true);
    expect(screen.getByText(testProps.label!)).toBeInTheDocument();
  });
});
