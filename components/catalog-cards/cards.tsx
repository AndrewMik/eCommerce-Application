import { Button, Card, Col, Layout, MenuProps, Row } from 'antd';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category, ProductDiscountValueRelative, ProductProjection } from '@commercetools/platform-sdk';
import getFilteredProducts from '@/pages/api/filter-products';
import getAllCategories from '@/pages/api/get-categories';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import { permyriadToPercentage, transformCentToDollar } from '../../utils/price';
import getProducts from '../../pages/api/get-products';
import { AttributeData } from './types';
import CatalogSider from '../catalog-sider/catalog-sider';
import { AllCategories, MenuKeyProps } from '../catalog-sider/types';

const { Content } = Layout;

const { Meta } = Card;

const CatalogCards = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[] | null>(null);
  const [attributeData, setAttributeData] = useState<AttributeData | null>(null);

  const [filterNames, setFilterNames] = useState<string[]>([]);

  const [allSelectedKeys, setAllSelectedKeys] = useState<string[][]>([]);
  const [allCategories, setAllCategories] = useState<AllCategories[] | null>(null);
  const [category, setCategory] = useState<string[]>([]);

  const displayCategories = (categories: AllCategories[]): MenuProps['items'] => {
    const items: MenuProps['items'] = ['category'].map((mainCategory) => {
      return {
        key: `${mainCategory}`,
        label: `Category:`,

        children: categories.map((subCat) => {
          const label = subCat.mainCategory.name.en;
          const menuKey = subCat.mainCategory.id;
          const childrenData = subCat.subCategory;

          const title = allSelectedKeys.filter((key) => key[1].split('category-').join('') === menuKey);

          const titleLabel = title.map((key) => {
            const titleSubcategory = subCat.subCategory.filter(
              (subCategory) => subCategory.id === key[0].split('subCategory-').join(''),
            );
            return titleSubcategory[0].name.en;
          });

          return {
            key: `category-${menuKey}`,
            label: `${label}: ${title && titleLabel ? titleLabel : ''}`,
            children: childrenData.map((data) => {
              return {
                key: `subCategory-${data.id}`,
                label: `${data.name.en}`,
                style: { color: '#243763' },
              };
            }),
          };
        }),
      };
    });
    return items;
  };

  const displayFilteres = (attributes: AttributeData): MenuProps['items'] => {
    const items: MenuProps['items'] = filterNames.map((name) => {
      const label = getCapitalizedFirstLabel(name);
      const childrenData = Object.values(attributes[name]);

      const title = allSelectedKeys.filter((key) => key[1] === name);

      const titleLabel = title.map((key) => attributes[name][key[0]].label);

      return {
        key: name,
        label: `${label}: ${title && titleLabel ? titleLabel : ''}`,

        children: childrenData.map((data) => {
          return {
            key: data.key,
            label: `${data.label}`,
            style: { color: '#243763' },
          };
        }),
      };
    });
    return items;
  };

  const getUpdatedProductCards = (cards: ProductProjection[] | number) => {
    if (cards && typeof cards !== 'number') {
      setProducts(cards);
    }
  };

  useEffect(() => {
    const getFilteredProductsInfo = async () => {
      if (!allSelectedKeys) return;
      const filtered = await getFilteredProducts(allSelectedKeys, category);
      if (filtered.response && typeof filtered.response !== 'number') {
        getUpdatedProductCards(filtered.response);
      }
    };
    getFilteredProductsInfo();
  }, [allSelectedKeys, category]);

  const handleSelect = (menuProps: MenuKeyProps) => {
    const { keyPath } = menuProps;

    setAllSelectedKeys((prevValue) => {
      return [...prevValue, keyPath];
    });
  };

  const showCategories = () => {
    const getCategory = async () => {
      const categories = await getAllCategories();

      if (typeof categories.response !== 'number' && categories.response) {
        const subCategoriesList: Category[] = [];
        const mainCategoriesList: Category[] = [];
        const allCategoriesList: AllCategories[] = [];

        categories.response.forEach((categoryValue) => {
          if (categoryValue.ancestors.length !== 0) {
            subCategoriesList.push(categoryValue);
          } else {
            mainCategoriesList.push(categoryValue);
          }
        });

        mainCategoriesList.forEach((mainCategory) => {
          const matchingSubCategories = subCategoriesList.filter((subCategory) =>
            subCategory.ancestors.some((ancestor) => ancestor.id === mainCategory.id && ancestor.typeId === 'category'),
          );

          if (matchingSubCategories.length > 0) {
            allCategoriesList.push({
              mainCategory,
              subCategory: matchingSubCategories,
            });
          }
        });

        setAllCategories(allCategoriesList);
      }
    };
    getCategory();
  };

  useEffect(() => {
    showCategories();
  }, []);

  const handleDeselect = (menuProps: MenuKeyProps) => {
    const { keyPath } = menuProps;

    setAllSelectedKeys((prevValue) => {
      const filtered = prevValue.filter((existingKeyPath) => existingKeyPath[0] !== keyPath[0]);
      return filtered;
    });
  };

  const handleSubMenuClick = (openKeys: string[]) => {
    setCategory([openKeys[openKeys.length - 1]]);
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
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);

    setFilterNames(attributeNames);
  }, [attributeData]);

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
          xs={{ span: 23, offset: 1 }}
          md={{ span: 11, offset: 1 }}
          lg={{ span: 7, offset: 1 }}
          xxl={{ span: 4, offset: 1 }}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
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
      <CatalogSider
        attributeData={attributeData}
        getUpdatedProductCards={getUpdatedProductCards}
        allSelectedKeys={allSelectedKeys}
        setAllSelectedKeys={setAllSelectedKeys}
        setCategory={setCategory}
        allCategories={allCategories}
        displayCategories={displayCategories}
        displayFilteres={displayFilteres}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
        handleSubMenuClick={handleSubMenuClick}
      />
      <Layout className="site-layout">
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', display: 'flex', justifyContent: 'center' }}>
          <Row
            gutter={[16, 16]}
            style={{
              marginTop: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '1600px',
            }}
          >
            {products && productCards}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CatalogCards;
