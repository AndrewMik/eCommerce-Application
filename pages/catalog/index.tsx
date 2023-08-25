import { Card, Col, Row, Space } from 'antd';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useState, useEffect } from 'react';
import { calculateDiscountPercentage, transformCentToDollar } from '../../utils/price';
import { Product } from '../../types/types';

import getProducts from '../api/get-products';

const { Meta } = Card;

const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[] | null>(null);
  console.log('products', products);
  const getProductsInfo = async () => {
    const { response } = await getProducts();
    if (!response) {
      setProducts(null);
      return;
    }

    if (Array.isArray(response)) {
      let processedKeys = new Set();

      const transformedResponse = response.reduce<Product[]>((acc, product) => {
        if (!processedKeys.has(product.key)) {
          processedKeys.add(product.key);
          acc.push({
            key: product.key || '',
            description: product.description || { en: '' },
            attributes: product.masterVariant.attributes || [],
            images: product.masterVariant.images || [],
            prices: product.masterVariant.prices || [],
            name: product.name,
          });
        }
        return acc;
      }, []);
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
          key={product.key}
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            key={product.key}
            hoverable
            style={{ width: 240, position: 'relative' }}
            cover={
              <div
                style={{
                  height: 240,
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  style={{ position: 'absolute', top: 0, right: 2, fontSize: '16px', color: 'red', fontWeight: 'bold' }}
                >
                  - {regularPrice && calculateDiscountPercentage(regularPrice, discountedPrice)}%
                </Col>
              )}
            </Row>
            <Meta
              title={
                <Row>
                  <Col span={24} style={{ fontSize: 18 }}>
                    {product.name && product.name.en}
                  </Col>
                  <Col style={{ marginRight: '5px', fontSize: '16px' }}>price:</Col>
                  <Col>
                    {discountedPrice ? (
                      <Row>
                        <Col
                          style={{
                            display: 'flex',
                            marginRight: '5px',
                            fontWeight: 'normal',
                            textDecoration: 'line-through',
                            alignItems: 'center',
                            fontSize: '16px',
                          }}
                        >
                          ${regularPrice && transformCentToDollar(regularPrice)}
                        </Col>
                        <Col style={{ fontSize: '16px', color: 'red' }}>${transformCentToDollar(discountedPrice)}</Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col style={{ fontSize: 16 }}>${regularPrice && transformCentToDollar(regularPrice)}</Col>
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
