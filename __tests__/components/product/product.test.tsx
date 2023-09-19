import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductProjection } from '@commercetools/platform-sdk';
import Product from '../../../components/product/product';

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

jest.mock('../../../components/product/slider', () => {
  return (props: any) => <div data-testid="slider" {...props}></div>;
});

jest.mock('../../../components/product/breadcrumb', () => {
  return (props: any) => <div data-testid="breadcrumb" {...props}></div>;
});

jest.mock('../../../components/product/details', () => {
  return (props: any) => <div data-testid="details" {...props}></div>;
});

jest.mock('../../../components/product/attributes', () => {
  return (props: any) => <div data-testid="attributes" {...props}></div>;
});

jest.mock('../../../components/product/modal', () => {
  return (props: any) => <div data-testid="modal" {...props}></div>;
});

test('renders Product component and handle click', () => {
  const product: ProductProjection = {
    id: '12345',
    version: 1,
    createdAt: '2023-01-01T00:00:00Z',
    lastModifiedAt: '2023-01-01T00:00:00Z',
    name: { en: 'Test Name' },
    productType: {
      id: '12',
      typeId: 'product-type',
    },
    slug: {
      en: 'test',
    },
    categories: [
      {
        id: 'a123',
        typeId: 'category',
      },
    ],
    variants: [],
    masterVariant: {
      id: 123456,
      images: [],
      attributes: [],
      prices: [
        {
          id: 'a123',
          value: {
            centAmount: 100,
            currencyCode: 'EUR',
            fractionDigits: 2,
            type: 'centPrecision',
          },
        },
      ],
    },
  };

  render(<Product product={product} />);

  expect(screen.getByTestId('slider')).toBeInTheDocument();
  expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
  expect(screen.getByTestId('details')).toBeInTheDocument();
  expect(screen.getByTestId('attributes')).toBeInTheDocument();
  expect(screen.getByTestId('modal')).toBeInTheDocument();
});
