import { Col, Layout, MenuProps, Row, Space, Input } from 'antd';
import { useState, useEffect, FormEvent } from 'react';
import { Cart, Category, ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import getFilteredProducts from '@/pages/api/filter-products';
import getAllCategories from '@/pages/api/get-categories';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import getSortedProducts from '@/pages/api/sort';
import getActiveCart from '@/pages/api/cart/get-active-cart';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';
import getCartWithToken from '@/pages/api/cart/get-cart-with-token';
import getProducts from '../../pages/api/get-products';
import { AttributeData } from './types';
import CatalogSider from './sider';
import CatalogProductCard from './card';

interface MenuKeyProps {
  keyPath: string[];
}

interface AllCategories {
  mainCategory: Category;
  subCategory: Category[];
}

type Response = Cart | ErrorResponse | undefined | null;

const { Content } = Layout;
const { Search } = Input;

const CatalogCards = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[] | null>(null);
  const [attributeData, setAttributeData] = useState<AttributeData | null>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [clear, setClear] = useState<boolean>(false);
  const [passSearchString, setPassSearchString] = useState<boolean>(false);
  const [sortString, setSortString] = useState<string>('');
  const [chosenSorting, setChosenSorting] = useState('');
  const [cart, setCart] = useState<Cart | null>(null);

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

  const displayFilters = (attributes: AttributeData): MenuProps['items'] => {
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
      let filtered;
      if (searchString.length > 0) {
        filtered = await getFilteredProducts(allSelectedKeys, category, searchString);
      } else {
        filtered = await getFilteredProducts(allSelectedKeys, category);
      }
      if (filtered.response && typeof filtered.response !== 'number') {
        if (sortString.length > 0) {
          filtered = await getSortedProducts(allSelectedKeys, category, searchString, sortString);
        }
        if (filtered.response && typeof filtered.response !== 'number') {
          getUpdatedProductCards(filtered.response);
        }
      }
    };

    getFilteredProductsInfo();
  }, [allSelectedKeys, category, clear, passSearchString, sortString]);

  const onSearch = (string: string) => {
    setSearchString(string);
    setPassSearchString((prevValue) => !prevValue);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
    if (target.value.length === 0) {
      setClear((prevValue) => !prevValue);
    }
  };

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
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);

    setFilterNames(attributeNames);
  }, [attributeData]);

  useEffect(() => {
    getProductsInfo();
    getCart();
  }, []);

  const handleNameDropDownClick = (key: ItemType) => {
    if (!key) return;
    const field = 'name.en';
    const direction = key.key;
    setChosenSorting(`Sorted by name: ${direction === 'asc' ? 'A to Z' : 'Z to A'}`);
    setSortString(`${field} ${direction}`);
  };

  const handlePriceDropDownClick = (key: ItemType) => {
    if (!key) return;
    const field = 'price';
    const direction = key.key;
    setChosenSorting(`Sorted by price: ${direction === 'asc' ? 'Lowest to Highest' : 'Highest to Lowest'}`);
    setSortString(`${field} ${direction}`);
  };

  const itemsForName: MenuProps['items'] = [
    {
      label: 'A to Z',
      key: 'asc',
      onClick: (key) => handleNameDropDownClick(key),
      style: { color: 'rgb(36, 55, 99)' },
    },
    {
      label: 'Z to A',
      key: 'desc',
      onClick: (key) => handleNameDropDownClick(key),
      style: { color: 'rgb(36, 55, 99)' },
    },
  ];

  const itemsForPrice: MenuProps['items'] = [
    {
      label: 'Lowest to Highest',
      key: 'asc',
      onClick: (key) => handlePriceDropDownClick(key),
      style: { color: 'rgb(36, 55, 99)' },
    },
    {
      label: 'Highest to Lowest',
      key: 'desc',
      onClick: (key) => handlePriceDropDownClick(key),
      style: { color: 'rgb(36, 55, 99)' },
    },
  ];

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
        displayFilters={displayFilters}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
        handleSubMenuClick={handleSubMenuClick}
        itemsForPrice={itemsForPrice}
        itemsForName={itemsForName}
        chosenSorting={chosenSorting}
        setSortString={setSortString}
        setChosenSorting={setChosenSorting}
      />
      <Layout className="site-layout">
        <Space style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', paddingRight: '10px' }}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
            onInput={(e) => handleInputChange(e)}
            value={searchString}
          />
        </Space>

        <Content
          style={{
            marginLeft: '16px',
            marginTop: '10px',
            overflow: 'initial',
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'hidden',
          }}
        >
          <Row
            style={{
              marginTop: '14px',
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '1600px',
              gap: '20px',
            }}
          >
            {products?.map((product) => (
              <Col
                key={product.key}
                style={{ display: 'flex', justifyContent: 'center', padding: '0', flexWrap: 'wrap', gap: '20px' }}
              >
                <CatalogProductCard product={product} cart={cart && cart} setCart={setCart} />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CatalogCards;
