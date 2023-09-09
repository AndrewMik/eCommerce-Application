import { useState, useEffect, useRef } from 'react';
import { Spin, Row, Col } from 'antd';
import { ProductProjection, Image } from '@commercetools/platform-sdk';

import Slider from './slider';
import ProductBreadcrumb from './breadcrumb';
import ProductDetails from './details';
import Attributes from './attributes';
import ImageModal from './modal';
import AddToCartButton from '../catalog-cards/add-to-cart/add-to-cart-button';

enum AttributesKeys {
  BRAND = 'brand',
  AGE_RANGE = 'age-range',
  GENDER = 'gender',
  MATERIAL = 'material',
}

const containerMediaStyles = `
  .container {
    padding-block: 32px;
    padding-inline: 32px;
    margin-inline: auto;
    min-height: 82vh;
    max-width: 1600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 576px) {
    .container {
      padding-block: 12px;
      padding-inline: 12px;
    }
  }`;

const Product = ({ product }: { product: ProductProjection }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const carouselRef = useRef<any>(null);
  const modalCarouselRef = useRef<any>(null);

  useEffect(() => {
    if (product) {
      setImages(product.masterVariant.images || []);
    }
  }, [product]);

  useEffect(() => {
    if (open && modalCarouselRef.current) {
      modalCarouselRef.current.goTo(currentImage);
    }
  }, [open, currentImage]);

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    carouselRef.current.goTo(index);
  };

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      if (modalCarouselRef.current) {
        modalCarouselRef.current.goTo(currentImage);
      }
    }, 0);
  };

  const next = () => {
    if (modalCarouselRef.current) {
      modalCarouselRef.current.next();
    }
  };

  const prev = () => {
    if (modalCarouselRef.current) {
      modalCarouselRef.current.prev();
    }
  };

  if (!product) {
    return <Spin />;
  }

  const { name } = product;
  const metaDescription = product.metaDescription ? product.metaDescription.en : '';
  const { masterVariant } = product;
  const { attributes } = masterVariant;

  let brand = '';
  let ageRange = '';
  let gender = '';
  let material = '';

  if (attributes) {
    const brandObj = attributes.find((attr) => attr.name === AttributesKeys.BRAND);

    if (brandObj) {
      brand = brandObj.value.label;
    }

    const ageRangeObj = attributes.find((attr) => attr.name === AttributesKeys.AGE_RANGE);

    if (ageRangeObj) {
      ageRange = ageRangeObj.value.label;
    }

    const genderObj = attributes.find((attr) => attr.name === AttributesKeys.GENDER);

    if (genderObj) {
      gender = genderObj.value.label;
    }

    const materialObj = attributes.find((attr) => attr.name === AttributesKeys.MATERIAL);
    if (materialObj) {
      material = materialObj.value.label;
    }
  }

  let regularPrice = 0;
  let discountedPrice = 0;

  if (masterVariant.prices) {
    regularPrice = masterVariant.prices[0].value.centAmount;

    if (masterVariant.prices[0].discounted) {
      discountedPrice = masterVariant.prices[0].discounted.value.centAmount;
    }
  }

  return (
    <>
      <div className="container">
        <Row gutter={32}>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <ProductBreadcrumb name={name.en} />
            <Slider
              images={images}
              handleImageClick={handleImageClick}
              handleThumbnailClick={handleThumbnailClick}
              carouselRef={carouselRef}
              name={name}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <div style={{ marginTop: 36 }}>
              <ProductDetails
                name={name.en}
                brand={brand}
                regularPrice={regularPrice}
                discountedPrice={discountedPrice}
              />
              <Attributes description={metaDescription} ageRange={ageRange} gender={gender} material={material} />
              <AddToCartButton productId={product.id} style={{ marginTop: 10 }} />
            </div>
          </Col>
        </Row>
        <ImageModal
          open={open}
          handleCancel={handleCancel}
          images={images}
          currentImage={currentImage}
          next={next}
          prev={prev}
          name={name}
          brand={brand}
          modalCarouselRef={modalCarouselRef}
        />
      </div>
      <style>{containerMediaStyles}</style>
    </>
  );
};

export default Product;
