import { useState, useEffect, useRef } from 'react';
import { Spin, Row, Col, Button } from 'antd';
import { ProductProjection, Image, Cart, ErrorResponse } from '@commercetools/platform-sdk';
import { ShoppingCartOutlined } from '@ant-design/icons';

import getCartWithToken from '../../pages/api/cart/get-cart-with-token';
import addProductToActiveCart from '../../pages/api/cart/add-product-to-cart';
import createNewCartWithProduct from '../../pages/api/cart/create-cart-with-product';
import getActiveCart from '../../pages/api/cart/get-active-cart';
import { handleErrorResponse } from '../../utils/handle-cart-error-response';
import Slider from './slider';
import ProductBreadcrumb from './breadcrumb';
import ProductDetails from './details';
import Attributes from './attributes';
import ImageModal from './modal';

type Response = Cart | ErrorResponse | undefined | null;

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
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart | null>(null);

  const carouselRef = useRef<any>(null);
  const modalCarouselRef = useRef<any>(null);

  const handleResponse = (response: Response) => {
    if (response) {
      if ('statusCode' in response) {
        handleErrorResponse(response);
      } else {
        setCart(response);
      }
    }
  };

  const getCart = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      await getCartWithToken();
    }
    const response = await getActiveCart();
    handleResponse(response);
  };

  useEffect(() => {
    getCart();
  }, []);

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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!cart) {
      const response = await createNewCartWithProduct(product.id);

      if (response) {
        if ('statusCode' in response) {
          handleErrorResponse(response);
        } else {
          setCart(response);
        }
        setLoading(false);
      }
    } else {
      const response = await addProductToActiveCart(cart.id, cart.version, product.id);

      if (response) {
        if ('statusCode' in response) {
          handleErrorResponse(response);
        } else {
          setCart(response);
        }
        setLoading(false);
      }
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
            </div>
            <Button
              icon={<ShoppingCartOutlined />}
              loading={loading}
              disabled={cart?.lineItems && cart?.lineItems.some((lineItem) => lineItem.productId === product.id)}
              onClick={handleClick}
              style={{ marginTop: 10 }}
            >
              Add to cart
            </Button>
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
