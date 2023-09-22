import { Image, LocalizedString } from '@commercetools/platform-sdk';

import { Carousel } from 'antd';

interface ModalCarouselProps {
  images: Image[];
  currentImage: number;
  name: LocalizedString;
  modalCarouselRef: React.MutableRefObject<any>;
}

const SliderModal: React.FC<ModalCarouselProps> = ({ images, currentImage, name, modalCarouselRef }) => {
  return (
    <Carousel dots={false} ref={modalCarouselRef} initialSlide={currentImage}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={name.en} style={{ width: '100%', aspectRatio: 1, objectFit: 'cover' }} />
        </div>
      ))}
    </Carousel>
  );
};

export default SliderModal;
