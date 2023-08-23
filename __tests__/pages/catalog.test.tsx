import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatalogPage from '../../pages/catalog/index';
import getAllProducts from '../../pages/api/get-products';

jest.mock('../../pages/api/get-products');

describe('<CatralogPage />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    (getAllProducts as jest.Mock).mockClear();
  });

  it('should fetch products on mount', async () => {
    const mockResponse = {
      response: [
        {
          id: '1',
          key: 'key1',
          name: { en: 'Test Product' },
          description: { en: 'Test Description' },
          masterVariant: { images: [{ url: 'test-image.jpg' }] },
        },
      ],
    };

    (getAllProducts as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<CatalogPage />);

    await waitFor(() => {
      expect(getAllProducts).toHaveBeenCalledTimes(1);
    });
  });

  it('should display fetched products', async () => {
    const mockResponse = {
      response: [
        {
          id: '1',
          key: 'key1',
          name: { en: 'Test Product' },
          description: { en: 'Test Description' },
          masterVariant: { images: [{ url: 'test-image.jpg' }] },
        },
      ],
    };

    (getAllProducts as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<CatalogPage />);

    const productText = await screen.findByText('Test Product');
    expect(productText).toBeInTheDocument();

    const descriptionText = await screen.findByText('Test Description');
    expect(descriptionText).toBeInTheDocument();

    const productImage = await screen.findByAltText('Test Product');
    expect(productImage).toBeInTheDocument();
  });

  it('should handle products without images gracefully', async () => {
    const mockResponse = {
      response: [
        {
          id: '1',
          key: 'key1',
          name: { en: 'Test Product' },
          description: { en: 'Test Description' },
          masterVariant: { images: [] },
        },
      ],
    };

    (getAllProducts as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<CatalogPage />);

    // Wait for products to be displayed
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    // Image shouldn't be there as it's not in the mock data
    expect(screen.queryByAltText('Test Product')).not.toBeInTheDocument();
  });
});
