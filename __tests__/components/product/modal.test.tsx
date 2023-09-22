import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Image, LocalizedString } from '@commercetools/platform-sdk';
import ImageModal from '../../../components/product/modal';

test('renders ImageModal with a single image', () => {
  const handleCancel = jest.fn();
  const next = jest.fn();
  const prev = jest.fn();
  const images: Image[] = [{ url: 'http://example.com/test.jpg', dimensions: { w: 100, h: 100 } }];
  const name: LocalizedString = { en: 'Test Name' };
  const modalCarouselRef = { current: null };

  render(
    <ImageModal
      open={true}
      handleCancel={handleCancel}
      images={images}
      currentImage={0}
      next={next}
      prev={prev}
      name={name}
      brand="Test Brand"
      modalCarouselRef={modalCarouselRef}
    />,
  );

  expect(screen.getByText('Test Brand Test Name')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /left/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /right/i })).not.toBeInTheDocument();
});

test('renders ImageModal with multiple images and navigates between them', () => {
  const handleCancel = jest.fn();
  const next = jest.fn();
  const prev = jest.fn();
  const images: Image[] = [
    { url: 'http://example.com/test1.jpg', dimensions: { w: 100, h: 100 } },
    { url: 'http://example.com/test2.jpg', dimensions: { w: 100, h: 100 } },
  ];
  const name: LocalizedString = { en: 'Test Name' };
  const modalCarouselRef = { current: null };

  render(
    <ImageModal
      open={true}
      handleCancel={handleCancel}
      images={images}
      currentImage={0}
      next={next}
      prev={prev}
      name={name}
      brand="Test Brand"
      modalCarouselRef={modalCarouselRef}
    />,
  );

  expect(screen.getByText('Test Brand Test Name')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /right/i }));
  expect(next).toHaveBeenCalled();

  fireEvent.click(screen.getByRole('button', { name: /left/i }));
  expect(prev).toHaveBeenCalled();
});
