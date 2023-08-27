import { Button, Card, Col, Row, Space } from 'antd';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductDiscountValueRelative } from '@commercetools/platform-sdk';
import { permyriadToPercentage, transformCentToDollar } from '../../utils/price';
import { Product } from '../../types/types';
import getProducts from '../../pages/api/get-products';

const { Meta } = Card;

const CatalogCards = (): JSX.Element => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const getProductsInfo = async () => {
    const { response } = await getProducts();

    if (!response) {
      setProducts(null);
      return;
    }

    if (Array.isArray(response)) {
      const transformedResponse = response.map((product) => {
        const { key, metaDescription, masterVariant, id } = product;
        const { attributes, images, prices } = masterVariant;
        const maxLengthOfDescription = 105;
        let descriptionPreview = metaDescription && metaDescription.en.split(/[!.]+/)[0];
        if (descriptionPreview && descriptionPreview.length > maxLengthOfDescription) {
          descriptionPreview = `${descriptionPreview.slice(0, maxLengthOfDescription)}...`;
        }

        const discountValue = product.masterVariant.prices?.[0]?.discounted?.discount?.obj
          ?.value as ProductDiscountValueRelative;

        return {
          key: key ?? '',
          id: id ?? '',
          description: metaDescription ?? { en: '' },
          descriptionPreview: descriptionPreview ?? '',
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
          <Link href={`/catalog/${encodeURIComponent(product.id)}`}>
            <Card
              bodyStyle={{ padding: '3px', paddingTop: '20px' }}
              key={product.key}
              hoverable
              style={{ width: 260, position: 'relative', textAlign: 'center', height: '450px' }}
              cover={
                <div
                  style={{
                    height: 240,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    borderTopRightRadius: '5px',
                  }}
                >
                  {product.images && product.images.length > 0 && (
                    <img style={{ width: '100%' }} alt={product.name.en} src={product.images[0].url} />
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
                      padding: '5px 0',
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
                        {product.name && product.name.en}
                      </span>
                    </Col>
                    <Col span={24}>
                      {discountedPrice ? (
                        <Row>
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
                              borderTop: '1px solid #C08261',
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
                  <div style={{ fontSize: 12, lineHeight: '1', margin: '3px' }}>
                    {product.descriptionPreview && <div style={{ height: 30 }}>{product.descriptionPreview}</div>}
                    <div>
                      <Button type="link" style={{ fontSize: '13px', padding: 0, margin: 0 }}>
                        see more details
                      </Button>
                    </div>
                  </div>
                }
              />
            </Card>
          </Link>
        </Col>
      );
    });

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', padding: 50 }}>
      <Row gutter={[16, 16]}>{products && productCards}</Row>
    </Space>
  );
};

export default CatalogCards;
