import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Modal, Space, Typography, Spin, Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ProductProjection, Image } from '@commercetools/platform-sdk';
import getProductbyKey from '../../api/get-product';

const { Title, Text } = Typography;

const ProductPage = () => {
  const router = useRouter();
  const { key } = router.query;
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [open, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof key === 'string') {
        const productData = await getProductbyKey(key);
        // eslint-disable-next-line no-console
        console.log('Product Data: ', productData);
        if (productData) {
          // eslint-disable-next-line no-console
          console.log(productData.masterVariant.images);
          setProduct(productData);
          setImages(productData.masterVariant.images || []);
        } else {
          console.error('Failed to fetch product data');
        }
      }
    };

    fetchProduct();
  }, [key]);

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (open) {
      carouselRef.current.goTo(currentImage);
    }
  }, [open, currentImage]);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  if (!key) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <Spin />;
  }

  const { name, metaDescription } = product;
  const { attributes } = product.masterVariant;
  const brand = attributes?.find((attr) => attr.name === 'brand')?.value;
  const ageRange = attributes?.find((attr) => attr.name === 'age-range')?.value;

  return (
    <div style={{ padding: '0 50px', minHeight: '82vh' }}>
      <Space direction="vertical" size="large">
        <Title>{name.en}</Title>
        <Text>{brand.label}</Text>
        <Text>{metaDescription?.en}</Text>
        <Text>{ageRange.label}</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={name.en}
              style={{ width: '200px', height: '200px', cursor: 'pointer', objectFit: 'cover' }}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <Modal visible={open} onCancel={handleCancel} footer={null}>
          <Carousel ref={carouselRef} dots={false}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={name.en}
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />
            ))}
          </Carousel>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button type="default" shape="circle" icon={<LeftOutlined />} onClick={prev} />
            <Button type="default" shape="circle" icon={<RightOutlined />} onClick={next} />
          </div>
        </Modal>
      </Space>
    </div>
  );
};

export default ProductPage;
