import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Image, LocalizedString } from '@commercetools/platform-sdk';
import React from 'react';
import Slider from '../../../components/product/slider';

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

jest.mock('antd/lib/carousel', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

test('renders Slider with multiple images and handle clicks', () => {
  const images: Image[] = [
    { url: 'http://example.com/test1.jpg', dimensions: { w: 100, h: 100 } },
    { url: 'http://example.com/test2.jpg', dimensions: { w: 100, h: 100 } },
  ];
  const name: LocalizedString = { en: 'Test Name' };
  const carouselRef = React.createRef();

  const handleImageClick = jest.fn();
  const handleThumbnailClick = jest.fn();

  render(
    <Slider
      images={images}
      handleImageClick={handleImageClick}
      handleThumbnailClick={handleThumbnailClick}
      carouselRef={carouselRef}
      name={name}
    />,
  );

  const imgs = screen.getAllByAltText(name.en) as HTMLImageElement[];
  imgs.forEach((img) => {
    expect(img).toHaveStyle({ width: '100%' });
    expect(img).toHaveStyle({ objectFit: 'cover' });
    fireEvent.click(img);
  });

  expect(handleImageClick).toHaveBeenCalledTimes(images.length);
  expect(handleThumbnailClick).toHaveBeenCalledTimes(images.length);
});
