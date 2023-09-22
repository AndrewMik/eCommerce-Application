import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { transformCentToDollar } from '../../../utils/price';
import ProductDetails from '../../../components/product/details';

describe('ProductDetails', () => {
  test('renders name, brand, and regular price', () => {
    render(<ProductDetails name="Test Product" brand="Test Brand" regularPrice={1000} discountedPrice={0} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Brand/i)).toBeInTheDocument();
    expect(screen.getByText(`$${transformCentToDollar(1000)}`)).toBeInTheDocument();
  });

  test('renders discounted price', () => {
    render(<ProductDetails name="Test Product" brand="Test Brand" regularPrice={2000} discountedPrice={1500} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Brand/i)).toBeInTheDocument();
    expect(screen.getByText(`$${transformCentToDollar(1500)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${transformCentToDollar(2000)}`)).toBeInTheDocument();
  });
});
