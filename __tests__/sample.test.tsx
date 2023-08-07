import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import MyComponent from '../components/test-component/test-component-for-jest';

test('renders hello world', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/Hello, world!/i);
  expect(linkElement).toBeInTheDocument();
});
