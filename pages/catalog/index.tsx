import { Card, Col, Row, Space } from 'antd';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useState, useEffect } from 'react';
import getProducts from '../api/get-products';

const { Meta } = Card;

const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[] | null>(null);

  const handleProductFetch = async () => {
    const { response } = await getProducts();
    setProducts(response);
  };

  useEffect(() => {
    handleProductFetch();
  }, []);

  const productCards =
    products &&
    products.map((product) => (
      <Col
        key={product.id}
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 12 }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card
          key={product.key}
          hoverable
          style={{ width: 240 }}
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
              {product.masterVariant.images && product.masterVariant.images.length > 0 && (
                <img style={{ height: 240 }} alt={product.name.en} src={product.masterVariant.images[0].url} />
              )}
            </div>
          }
        >
          <Meta
            style={{ textAlign: 'center' }}
            title={product.name && product.name.en}
            description={product.description && product.description.en}
          />
        </Card>
      </Col>
    ));

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', padding: 50 }}>
      <Row gutter={[16, 16]}>{products && productCards}</Row>
    </Space>
  );
};

export default CatalogPage;
