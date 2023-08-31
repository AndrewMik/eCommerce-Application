import { Image, LocalizedString } from '@commercetools/platform-sdk';

import { Carousel, Row, Col } from 'antd';

interface ImageCarouselProps {
  images: Image[];
  handleImageClick: (index: number) => void;
  handleThumbnailClick: (index: number) => void;
  carouselRef: React.RefObject<any>;
  name: LocalizedString;
}

const customClassname = 'carousel-dots';
const customDotsStyles = `
  .carousel-dots li button {
    background-color: #393939 !important;
    border: 0.5px solid white !important;
    height: 5px !important;
    border-radius: 10px !important;
  }`;

const Slider: React.FC<ImageCarouselProps> = ({
  images,
  handleImageClick,
  handleThumbnailClick,
  carouselRef,
  name,
}) => {
  return (
    <>
      <Carousel dots={{ className: customClassname }} ref={carouselRef}>
        {images.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(index)}>
            <img
              src={image.url}
              alt={name.en}
              style={{ width: '100%', aspectRatio: 1, borderRadius: '1%', cursor: 'pointer', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
      <Row justify="center" gutter={8} style={{ marginTop: 10 }}>
        {images.length > 1 &&
          images.map((image, index) => (
            <Col key={index} style={{ flex: 1 }}>
              <img
                src={image.url}
                alt={name.en}
                style={{ width: '100%', borderRadius: '5%', aspectRatio: 1, cursor: 'pointer', objectFit: 'cover' }}
                onClick={() => handleThumbnailClick(index)}
              />
            </Col>
          ))}
      </Row>
      <style>{customDotsStyles}</style>
    </>
  );
};

export default Slider;
