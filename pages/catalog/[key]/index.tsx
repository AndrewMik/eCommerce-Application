import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Modal, Typography, Spin, Carousel, Row, Col, Button, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ProductProjection, Image } from '@commercetools/platform-sdk';
import getProductbyKey from '../../api/get-product';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ProductPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);
  const modalCarouselRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof key === 'string') {
        const productData = await getProductbyKey(key);
        console.log(productData);
        if (productData) {
          setProduct(productData);
          setImages(productData.masterVariant.images || []);
        } else {
          console.error('Failed to fetch product data');
        }
      }
    };

    fetchProduct();
  }, [key]);

  useEffect(() => {
    if (open) {
      modalCarouselRef.current.goTo(currentImage);
    }
  }, [open, currentImage]);

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
    carouselRef.current.goTo(index);
  };

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      modalCarouselRef.current.goTo(currentImage);
    }, 0);
  };

  const next = () => {
    modalCarouselRef.current.next();
  };

  const prev = () => {
    modalCarouselRef.current.prev();
  };

  if (!key) {
    return <div>There will be 404 page one day...</div>;
  }

  if (!product) {
    return <Spin />;
  }

  const { name, metaDescription } = product;
  const { attributes } = product.masterVariant;
  const brand = attributes?.find((attr) => attr.name === 'brand')?.value;
  const ageRange = attributes?.find((attr) => attr.name === 'age-range')?.value;
  const gender = attributes?.find((attr) => attr.name === 'gender')?.value;
  const material = attributes?.find((attr) => attr.name === 'material')?.value;

  return (
    <div
      style={{
        paddingBlock: '32px',
        paddingInline: '40px',
        minHeight: '82vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Row gutter={48}>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <Carousel dots={{ className: 'carousel-dots' }} ref={carouselRef}>
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
          <Row justify="center" gutter={8} style={{ marginTop: '10px' }}>
            {images.map((image, index) => (
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
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <div>
            <Title>{name.en}</Title>
            <Text>{brand.label}</Text>
            <Collapse defaultActiveKey={['1']} bordered={false}>
              <Panel header="Description" key="1">
                <Text>{metaDescription?.en}</Text>
              </Panel>
              <Panel header="Age Range" key="2">
                <Text>{ageRange.label}</Text>
              </Panel>
              <Panel header="Gender" key="3">
                <Text>{gender.label}</Text>
              </Panel>
              <Panel header="Material" key="4">
                <Text>{material.label}</Text>
              </Panel>
            </Collapse>
          </div>
        </Col>
      </Row>
      <Modal open={open} onCancel={handleCancel} footer={null}>
        <Carousel dots={false} ref={modalCarouselRef} initialSlide={currentImage}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt={name.en} style={{ width: '100%', aspectRatio: 1, objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <Button type="default" shape="circle" icon={<LeftOutlined />} onClick={prev} />
          <Text>
            {brand.label} {name.en}
          </Text>
          <Button type="default" shape="circle" icon={<RightOutlined />} onClick={next} />
        </div>
      </Modal>
    </div>
  );
};

export default ProductPage;
