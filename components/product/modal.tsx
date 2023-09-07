import { Image, LocalizedString } from '@commercetools/platform-sdk';

import { Modal, Button, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import SliderModal from './slider-modal';
import FontColors from './product.data';

const { Title } = Typography;

interface ImageModalProps {
  open: boolean;
  handleCancel: () => void;
  images: Image[];
  currentImage: number;
  next: () => void;
  prev: () => void;
  name: LocalizedString;
  brand: string;
  modalCarouselRef: React.MutableRefObject<any>;
}

const customClassname = 'custom-modal';
const customModalMediaStyles = `
  @media screen and (max-width: 991px) {
    .custom-modal {
      width: 90% !important;
    }
  }`;

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  handleCancel,
  images,
  currentImage,
  next,
  prev,
  name,
  brand,
  modalCarouselRef,
}) => {
  return (
    <>
      <Modal
        className={customClassname}
        width={'75vh'}
        centered={true}
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <SliderModal images={images} currentImage={currentImage} name={name} modalCarouselRef={modalCarouselRef} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: '10px',
          }}
        >
          {images.length > 1 && <Button type="default" shape="circle" icon={<LeftOutlined />} onClick={prev} />}
          <Title level={5} style={{ marginInline: 0, color: FontColors.BASE }}>
            {brand} {name.en}
          </Title>
          {images.length > 1 && <Button type="default" shape="circle" icon={<RightOutlined />} onClick={next} />}
        </div>
      </Modal>
      <style>{customModalMediaStyles}</style>
    </>
  );
};

export default ImageModal;
