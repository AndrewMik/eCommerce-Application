import { Col, Layout, MenuProps, Row, Space, Input } from 'antd';
import { useState, useEffect, FormEvent, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AttributeDefinition, Cart, Category, ErrorResponse, ProductProjection } from '@commercetools/platform-sdk';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import getActiveCart from '@/pages/api/cart/get-active-cart';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';
import getCartWithToken from '@/pages/api/cart/get-cart-with-token';
import { AuthContext } from '@/context/authorization-context';
import getSortedProducts from '@/pages/api/sort';
import { AttributeData, AttributeValue } from './types';
import CatalogSider from './sider';
import CatalogProductCard from './card';
import Spinner from '../spinner/spinner';

let loading = false;

interface MenuKeyProps {
  keyPath: string[];
}

export interface AllCategories {
  mainCategory: Category;
  subCategory: Category[];
}

interface Props {
  allCategories: AllCategories[];
  attributes: AttributeDefinition[];
}

type Response = Cart | ErrorResponse | undefined | null;

const { Content } = Layout;
const { Search } = Input;

const attributeTransformer = (initialAttributes: AttributeDefinition[]): AttributeData => {
  const transformedAttributes: AttributeData = {};
  initialAttributes.forEach((attr) => {
    const values: Record<string, AttributeValue> = {};
    if (attr.type.name === 'enum') {
      attr.type.values.forEach((value) => {
        values[value.key] = value;
      });
    }
    transformedAttributes[attr.name] = values;
  });

  return transformedAttributes;
};

const CatalogCards = ({ allCategories, attributes }: Props): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [attributeData] = useState<AttributeData>(attributeTransformer(attributes));

  const [searchString, setSearchString] = useState<string>('');
  const [passSearchString, setPassSearchString] = useState<boolean>(false);

  const [sortString, setSortString] = useState<string>('');
  const [chosenSorting, setChosenSorting] = useState('');

  const [cart, setCart] = useState<Cart | null>(null);
  const { setCount } = useContext(AuthContext);

  const [filterNames, setFilterNames] = useState<string[]>([]);
  const [allSelectedKeys, setAllSelectedKeys] = useState<string[][]>([]);

  const [category, setCategory] = useState<string[]>([]);
  const [count, setGoodsCount] = useState<number>(0);

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

  const filtersRenderer = (initialAttributes: AttributeData): MenuProps['items'] => {
    const items: MenuProps['items'] = filterNames.map((name) => {
      const label = getCapitalizedFirstLabel(name);
      const childrenData = Object.values(initialAttributes[name]);

      const title = allSelectedKeys.filter((key) => key[1] === name);

      const titleLabel = title.map((key) => initialAttributes[name][key[0]].label);

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

  const onSearch = (string: string) => {
    setSearchString(string);
    setPassSearchString((prevValue) => !prevValue);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
  };

  const handleSelect = (menuProps: MenuKeyProps) => {
    const { keyPath } = menuProps;

    setAllSelectedKeys((prevValue) => {
      return [...prevValue, keyPath];
    });
  };

  const handleDeselect = (menuProps: MenuKeyProps) => {
    const { keyPath } = menuProps;

    setAllSelectedKeys((prevValue) => {
      const filtered = prevValue.filter((existingKeyPath) => existingKeyPath[0] !== keyPath[0]);
      return filtered;
    });
  };

  const getProductsInfo = async (isInfiniteLoading: boolean) => {
    try {
      let response;

      if (isInfiniteLoading) {
        response = await getSortedProducts(products.length, allSelectedKeys, category, searchString, sortString);
        setProducts([...products, ...response.results]);
      } else {
        response = await getSortedProducts(0, allSelectedKeys, category, searchString, sortString);
        setProducts(response.results);
      }

      setGoodsCount(response.total || 0);
    } catch (error) {
      setProducts([]);
    }
  };

  const handleResponse = (response: Response) => {
    if (response) {
      if ('statusCode' in response) {
        handleErrorResponse(response);
        return null;
      }
      return response;
    }
    return null;
  };

  const getCart = async () => {
    setTimeout(async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      let response = null;
      if (loading) return null;
      loading = true;
      if (refreshToken !== null) {
        response = await getCartWithToken();
      } else {
        response = await getActiveCart();
      }

      const nextCart = handleResponse(response);
      loading = false;
      if (nextCart) {
        setCart(nextCart);
        localStorage.setItem('cart', JSON.stringify(nextCart));
      }
      return nextCart;
    }, 5000);
  };

  useEffect(() => {
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);

    setFilterNames(attributeNames);
  }, [attributeData]);

  useEffect(() => {
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);

    setFilterNames(attributeNames);
  }, [attributeData]);

  useEffect(() => {
    async function fn() {
      await getCart();
    }

    fn();
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

  const loadMoreData = async (isInfiniteLoading: boolean) => {
    try {
      await getProductsInfo(isInfiniteLoading);
    } catch (error) {
      // TODO: find way to process this error
    }
  };

  useEffect(() => {
    loadMoreData(false);
  }, [allSelectedKeys, category, passSearchString, sortString]);

  return (
    <Layout hasSider>
      <CatalogSider
        attributeData={attributeData}
        allSelectedKeys={allSelectedKeys}
        setAllSelectedKeys={setAllSelectedKeys}
        setCategory={setCategory}
        allCategories={allCategories}
        displayCategories={displayCategories}
        displayFilters={filtersRenderer}
        handleSelect={handleSelect}
        handleDeselect={handleDeselect}
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
          id="scrollableDiv"
          style={{
            marginLeft: '16px',
            marginTop: '10px',
            overflow: 'initial',
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'hidden',
          }}
        >
          <InfiniteScroll
            dataLength={products.length}
            next={() => loadMoreData(true)}
            hasMore={products.length < count}
            loader={<Spinner />}
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
                  <CatalogProductCard product={product} cart={cart} setCart={setCart} />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CatalogCards;
