import { render, screen } from '@testing-library/react';
import { Form } from 'antd';
import '@testing-library/jest-dom/extend-expect';

import PersonalSection from '../../../../components/registration-form/sections/personal-section';

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('PersonalSection', () => {
  const WrappedPersonalSection = () => (
    <Form>
      <PersonalSection />
    </Form>
  );

  it('renders the personal divider text', () => {
    render(<WrappedPersonalSection />);
    const dividerText = screen.getByText('Personal');
    expect(dividerText).toBeInTheDocument();
  });

  it('renders the name input field', () => {
    render(<WrappedPersonalSection />);
    const nameInput = screen.getByPlaceholderText('John');
    expect(nameInput).toBeInTheDocument();
  });

  it('renders the surname input field', () => {
    render(<WrappedPersonalSection />);
    const surnameInput = screen.getByPlaceholderText('Doe');
    expect(surnameInput).toBeInTheDocument();
  });

  it('renders the birth date field', () => {
    render(<WrappedPersonalSection />);
    const birthDateInput = screen.getByPlaceholderText('1990-03-20');
    expect(birthDateInput).toBeInTheDocument();
  });
});
