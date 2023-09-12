import { Card, Row, Col, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { Cart, ProductDiscountValueRelative, ProductProjection } from '@commercetools/platform-sdk';
import { permyriadToPercentage, transformCentToDollar } from '@/utils/price';
import createNewCartWithProduct from '@/pages/api/create-new-cart-with-product';
import addProductToActiveCart from '@/pages/api/add-product-to-active-cart';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';

const { Meta } = Card;

interface Props {
  product: ProductProjection;
  cart: Cart | null;
  setCart: (value: React.SetStateAction<Cart | null>) => void;
}

const CatalogProductCard = (props: Props) => {
  const { key, masterVariant, id, metaDescription } = props.product;
  const { attributes, images, prices } = masterVariant;
  const [loading, setLoading] = useState<boolean>();

  if (!attributes) throw new Error('No attributes found');
  if (!images) throw new Error('No images found');
  if (!id) throw new Error('No id found');
  if (!key) throw new Error('No key found');

  const maxLengthOfDescription = 115;
  let descriptionPreview = metaDescription && metaDescription.en;

  if (descriptionPreview && descriptionPreview.length > maxLengthOfDescription) {
    descriptionPreview = `${descriptionPreview.slice(0, maxLengthOfDescription)}...`;
  }

  if (!prices) throw new Error('No prices found');
  const { discounted, value } = prices[0];
  const regularPrice = value.centAmount;

  let discountAmount: number | null = null;
  let discountedPrice: number | null = null;

  if (!discounted) {
    discountAmount = null;
    discountedPrice = null;
  } else {
    const { discount } = discounted;

    if (!discount) throw new Error('No discount found');
    const { obj } = discount;

    if (!obj) throw new Error('No obj found');
    const { value: discountValue } = obj;

    const { permyriad } = discountValue as ProductDiscountValueRelative;
    discountAmount = permyriadToPercentage(permyriad);
    discountedPrice = discounted.value.centAmount;
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!props.cart) {
      const response = await createNewCartWithProduct(props.product.id);

      if (response) {
        if ('statusCode' in response) {
          handleErrorResponse(response);
        } else {
          props.setCart(response);
        }
        setLoading(false);
      }
    } else {
      const response = await addProductToActiveCart(props.cart.id, props.cart.version, props.product.id);

      if (response) {
        if ('statusCode' in response) {
          handleErrorResponse(response);
        } else {
          props.setCart(response);
        }
        setLoading(false);
      }
    }
  };

  return (
    <Link href={`/catalog/${encodeURIComponent(key)}`}>
      <Card
        bodyStyle={{ padding: '3px', paddingTop: '20px' }}
        key={key}
        hoverable
        style={{ width: 260, position: 'relative', textAlign: 'center', height: '450px' }}
        cover={
          <div
            style={{
              height: 240,
              overflow: 'hidden',
              borderRadius: '5px 5px 0 0',
              backgroundImage: `url(${images[0].url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        }
      >
        <Row>
          {discountedPrice && (
            <Col
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                fontSize: '16px',
                color: 'red',
                fontWeight: 'bold',
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '3px 5px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              - {discountAmount}%
            </Col>
          )}
        </Row>
        <Meta
          title={
            <Row>
              <Col span={24} style={{ fontSize: 16, textAlign: 'center', height: 40 }}>
                <span
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'normal',
                    color: 'rgba(33, 41, 62, 1)',
                    textTransform: 'uppercase',
                    lineHeight: '1',
                    paddingBottom: '10px',
                    fontSize: '14px',
                  }}
                >
                  {props.product.name && props.product.name.en}
                </span>
              </Col>
              <Col span={24}>
                {discountedPrice ? (
                  <Row style={{ borderTop: '1px solid rgba(55, 34, 11, 0.11)' }}>
                    <Col
                      span={6}
                      offset={6}
                      style={{
                        color: '#243763',
                        display: 'flex',
                        fontWeight: 'normal',
                        textDecoration: 'line-through',
                        alignItems: 'center',
                        fontSize: '16px',
                        paddingTop: '10px',
                      }}
                    >
                      ${regularPrice && transformCentToDollar(regularPrice)}
                    </Col>
                    <Col style={{ fontSize: 18, color: 'red', paddingTop: '9px', fontWeight: 'bolder' }}>
                      ${transformCentToDollar(discountedPrice)}
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col
                      span={24}
                      style={{
                        fontSize: 18,
                        borderTop: '1px solid rgba(55, 34, 11, 0.11)',
                        paddingTop: '10px',
                        fontWeight: 'bolder',
                        color: '#243763',
                      }}
                    >
                      ${regularPrice && transformCentToDollar(regularPrice)}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          }
          description={
            <div style={{ fontSize: 12, lineHeight: '1', margin: '3px', paddingBottom: 5 }}>
              {descriptionPreview && <div style={{ height: 30 }}>{descriptionPreview}</div>}
              <div>
                <Button type="link" style={{ fontSize: '13px', padding: 0, margin: 0 }}>
                  see more details
                </Button>
              </div>
              <Button
                icon={<ShoppingCartOutlined />}
                loading={loading}
                disabled={props.cart?.lineItems.some((lineItem) => lineItem.productId === props.product.id)}
                onClick={handleClick}
                style={{ marginTop: 5 }}
              >
                Add to cart
              </Button>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default CatalogProductCard;
