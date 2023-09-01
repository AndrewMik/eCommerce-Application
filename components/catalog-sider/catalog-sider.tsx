import { Button, Layout, Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import getFilteredProducts from '@/pages/api/filter-products';
import getAllCategories from '@/pages/api/get-categories';
import { CatalogSiderProps, MenuKeyProps } from './types';
import { AttributeData } from '../catalog-cards/types';

const { Sider } = Layout;

interface AllCategories {
  mainCategory: Category;
  subCategory: Category[];
}

const CatalogSider = (props: CatalogSiderProps) => {
  const { attributeData, getUpdatedProductCards } = props;
  const [filterNames, setFilterNames] = useState<string[]>([]);
  const [allSelectedKeys, setAllSelectedKeys] = useState<string[][]>([]);
  const [allCategories, setAllCategories] = useState<AllCategories[] | null>(null);

  const displayCategories = (categories: AllCategories[]): MenuProps['items'] => {
    const items: MenuProps['items'] = categories.map((category) => {
      const label = category.mainCategory.name.en;
      const menuKey = category.mainCategory.id;
      const childrenData = category.subCategory;

      const title = allSelectedKeys.filter((key) => key[1].split('category-').join('') === menuKey);

      const titleLabel = title.map((key) => {
        const titleSubcategory = category.subCategory.filter((subCategory) => subCategory.id === key[0]);
        return titleSubcategory[0].name.en;
      });

      return {
        key: `category-${menuKey}`,
        label: `${label}: ${title && titleLabel ? titleLabel : ''}`,
        style: { fontSize: '12px', maxHeight: '500px', overflowY: 'scroll' },

        children: childrenData.map((data) => {
          return {
            key: data.id,
            label: `${data.name.en}`,
            style: { paddingLeft: '20px', height: '20px', color: '#243763' },
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
        style: { fontSize: '12px', maxHeight: '500px', overflowY: 'scroll' },

        children: childrenData.map((data) => {
          return {
            key: data.key,
            label: `${data.label}`,
            style: { paddingLeft: '20px', height: '20px', color: '#243763' },
          };
        }),
      };
    });
    return items;
  };

  useEffect(() => {
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);

    setFilterNames(attributeNames);
  }, [attributeData]);

  useEffect(() => {
    const getFilteredProductsInfo = async () => {
      if (!allSelectedKeys) return;
      const filtered = await getFilteredProducts(allSelectedKeys);
      if (filtered.response && typeof filtered.response !== 'number') {
        getUpdatedProductCards(filtered.response);
      }
    };
    getFilteredProductsInfo();
  }, [allSelectedKeys]);

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

        categories.response.forEach((category) => {
          if (category.ancestors.length !== 0) {
            subCategoriesList.push(category);
          } else {
            mainCategoriesList.push(category);
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

  return (
    <>
      <Sider
        style={{
          marginTop: '60px',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
        }}
      >
        <Button
          type="primary"
          shape="round"
          size="small"
          style={{
            backgroundColor: 'transparent',
            marginLeft: '110px',
            marginTop: '5px',
            color: '#243763',
            fontSize: '10px',
            lineHeight: '1',
            height: '15px',
          }}
          onClick={() => {
            setAllSelectedKeys([]);
          }}
        >
          reset filters
        </Button>
        <Menu
          mode="inline"
          style={{ height: 'calc(100% - 70px)', borderRight: 0, marginTop: '10px', overflowY: 'scroll' }}
          items={
            allCategories && attributeData
              ? [...(displayCategories(allCategories) || []), ...(displayFilteres(attributeData) || [])]
              : []
          }
          selectedKeys={allSelectedKeys.map((key) => key[0])}
          onSelect={({ keyPath }) => handleSelect({ keyPath })}
          onDeselect={({ keyPath }) => handleDeselect({ keyPath })}
        />
      </Sider>
    </>
  );
};

export default CatalogSider;
