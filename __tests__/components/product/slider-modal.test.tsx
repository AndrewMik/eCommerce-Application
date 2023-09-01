import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Image, LocalizedString } from '@commercetools/platform-sdk';
import SliderModal from '../../../components/product/slider-modal';

jest.mock('antd/lib/carousel', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

test('renders SliderModal with multiple images', () => {
  const images: Image[] = [
    { url: 'http://example.com/test1.jpg', dimensions: { w: 100, h: 100 } },
    { url: 'http://example.com/test2.jpg', dimensions: { w: 100, h: 100 } },
  ];
  const name: LocalizedString = { en: 'Test Name' };
  const modalCarouselRef = { current: null };

  render(<SliderModal images={images} currentImage={0} name={name} modalCarouselRef={modalCarouselRef} />);

  const imgs = screen.getAllByAltText(name.en) as HTMLImageElement[];
  imgs.forEach((img, index) => {
    expect(img.src).toBe(images[index].url);
    expect(img).toHaveStyle({ width: '100%' });
    expect(img).toHaveStyle({ objectFit: 'cover' });
  });
});
