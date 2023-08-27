import { Card, Col, Row, Space } from 'antd';
import { useState, useEffect } from 'react';
import { ProductDiscountValueRelative } from '@commercetools/platform-sdk';
import { permyriadToPercentage, transformCentToDollar } from '../../utils/price';
import { Product } from '../../types/types';
import getProducts from '../api/get-products';

const { Meta } = Card;

const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const getProductsInfo = async () => {
    const { response } = await getProducts();

    if (!response) {
      setProducts(null);
      return;
    }

    if (Array.isArray(response)) {
      const transformedResponse = response.map((product) => {
        const { key, description, masterVariant } = product;
        const { attributes, images, prices } = masterVariant;

        const discountValue = product.masterVariant.prices?.[0]?.discounted?.discount?.obj
          ?.value as ProductDiscountValueRelative;

        return {
          key: key ?? '',
          description: description ?? { en: '' },
          attributes: attributes ?? [],
          images: images ?? [],
          prices: prices ?? [],
          name: product.name,
          discount: discountValue?.permyriad ?? 0,
        };
      });

      setProducts(transformedResponse);
    } else if (typeof response === 'number') {
      setProducts(null);
      throw new Error('Error fetching products');
    }
  };

  useEffect(() => {
    getProductsInfo();
  }, []);

  const productCards =
    products &&
    products.map((product) => {
      const regularPrice = product.prices?.[0].value.centAmount;
      const discountedPrice = product.prices?.[0].discounted?.value.centAmount;
      return (
        <Col
          key={product.name.en}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            key={product.key}
            hoverable
            style={{ width: 240, position: 'relative', textAlign: 'center' }}
            cover={
              <div
                style={{
                  height: 240,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                }}
              >
                {product.images && product.images.length > 0 && (
                  <img style={{ height: 240 }} alt={product.name.en} src={product.images[0].url} />
                )}
              </div>
            }
          >
            <Row>
              {discountedPrice && (
                <Col
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -15,
                    fontSize: '16px',
                    color: 'red',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  - {product.discount && permyriadToPercentage(product.discount)}%
                </Col>
              )}
            </Row>
            <Meta
              title={
                <Row>
                  <Col span={24} style={{ fontSize: 16, textAlign: 'center' }}>
                    {product.name && product.name.en}
                  </Col>
                  <Col span={24}>
                    {discountedPrice ? (
                      <Row>
                        <Col
                          span={6}
                          offset={6}
                          style={{
                            display: 'flex',
                            fontWeight: 'normal',
                            textDecoration: 'line-through',
                            alignItems: 'center',
                            fontSize: '16px',
                          }}
                        >
                          ${regularPrice && transformCentToDollar(regularPrice)}
                        </Col>
                        <Col offset={1} style={{ fontSize: 18, color: 'red' }}>
                          ${transformCentToDollar(discountedPrice)}
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col span={24} style={{ fontSize: 18 }}>
                          ${regularPrice && transformCentToDollar(regularPrice)}
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              }
              description={product.description && product.description.en}
            />
          </Card>
        </Col>
      );
    });

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', padding: 50 }}>
      <Row gutter={[16, 16]}>{products && productCards}</Row>
    </Space>
  );
};

export default CatalogPage;
