import { Button, Card, Col, Layout, Row, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductDiscountValueRelative, ProductProjection } from '@commercetools/platform-sdk';
import { permyriadToPercentage, transformCentToDollar } from '../../utils/price';
import getProducts from '../../pages/api/get-products';
import { AttributeData } from './types';
import CatalogSider from '../catalog-sider/catalog-sider';

const { Content } = Layout;

const { Meta } = Card;

const CatalogCards = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[] | null>(null);
  const [attributeData, setAttributeData] = useState<AttributeData | null>(null);

  const getUpdatedProductCards = (cards: ProductProjection[] | number) => {
    if (cards) {
      setProducts(cards as ProductProjection[]);
    }
  };

  const getProductsInfo = async () => {
    const { response } = await getProducts();

    if (!response) {
      setProducts(null);
      return;
    }

    if (Array.isArray(response)) {
      const newAttributeData: AttributeData = {};

      response.forEach((product) => {
        const { attributes } = product.masterVariant;

        if (attributes) {
          attributes.forEach((attr) => {
            const { name, value } = attr;

            if (!newAttributeData[name]) {
              newAttributeData[name] = {};
            }

            newAttributeData[name][value.key] = value;
          });
        }
      });

      setAttributeData(newAttributeData);

      setProducts(response);
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
      const { key, masterVariant, id, metaDescription } = product;
      const { attributes, images, prices } = masterVariant;

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

      return (
        <Col
          key={product.name.en}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          xxl={{ span: 6 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
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
                        {product.name && product.name.en}
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
                  <div style={{ fontSize: 12, lineHeight: '1', margin: '3px' }}>
                    {descriptionPreview && <div style={{ height: 30 }}>{descriptionPreview}</div>}
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
    <Layout hasSider>
      <CatalogSider attributeData={attributeData} getUpdatedProductCards={getUpdatedProductCards} />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={[16, 16]}>{products && productCards}</Row>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CatalogCards;
