import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductBreadcrumb from '../../../components/product/breadcrumb';

jest.mock('next/link', () => {
  return ({ children }: { children: ReactNode }) => {
    return children;
  };
});

test('renders ProductBreadcrumb component', () => {
  const props = {
    name: 'Test Name',
  };

  render(<ProductBreadcrumb {...props} />);

  expect(screen.getByText('Catalog')).toBeInTheDocument();
  expect(screen.getByText('Test Name')).toBeInTheDocument();
});
