import { Button, Layout, Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import getFilteredProducts from '@/pages/api/filter-products';
import getAllCategories from '@/pages/api/get-categories';
import findMainCategoryById from '@/utils/sub-categorySearch';
import { CatalogSiderProps, MenuKeyProps, AllCategories } from './types';
import { AttributeData } from '../catalog-cards/types';

const { Sider } = Layout;

const CatalogSider = (props: CatalogSiderProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const { attributeData, getUpdatedProductCards } = props;
  const [filterNames, setFilterNames] = useState<string[]>([]);
  const [allSelectedKeys, setAllSelectedKeys] = useState<string[][]>([]);
  const [allCategories, setAllCategories] = useState<AllCategories[] | null>(null);
  const [category, setCategory] = useState<string[]>([]);

  const displayCategories = (categories: AllCategories[]): MenuProps['items'] => {
    const items: MenuProps['items'] = ['category'].map((mainCategory) => {
      let categoryTitle: Category | null = null;

      if (category.length !== 0) {
        categoryTitle = findMainCategoryById(categories, category[0]);
      }

      return {
        key: `${mainCategory}`,
        label: `Category: ${categoryTitle ? categoryTitle.name.en : ''}`,

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
            // style: { fontSize: '14px', maxHeight: '500px', overflowY: 'scroll' },

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

  useEffect(() => {
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);

    setFilterNames(attributeNames);
  }, [attributeData]);

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
    if (openKeys.length < 2) return;
    setCategory([openKeys[openKeys.length - 1]]);
  };

  return (
    <>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'fixed',
          fontSize: '16px',
          marginLeft: '7px',
          marginTop: '40px',
          width: 64,
          height: 64,
          zIndex: 101,
        }}
      />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        width={300}
        style={{
          borderRadius: '5px',
          height: 'calc(100vh - 100px)',
          position: 'fixed',
          left: 0,
          top: '100px',
          backgroundColor: 'white',
          zIndex: 100,
          overflow: 'auto',
        }}
      >
        <Button
          size="small"
          style={{
            marginLeft: '120px',
            left: '0px',
            top: '25px',
            zIndex: 101,
            backgroundColor: 'transparent',
            color: '#243763',
            fontSize: '10px',
            lineHeight: '1',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setAllSelectedKeys([]);
            setCategory([]);
          }}
        >
          reset filters
        </Button>
        <Menu
          mode="inline"
          style={{ borderRight: 0, marginTop: '80px', overflowY: 'scroll', zIndex: 100 }}
          items={
            allCategories && attributeData
              ? [...(displayCategories(allCategories) || []), ...(displayFilteres(attributeData) || [])]
              : []
          }
          selectedKeys={allSelectedKeys.map((key) => key[0])}
          onSelect={({ keyPath }) => handleSelect({ keyPath })}
          onDeselect={({ keyPath }) => handleDeselect({ keyPath })}
          onOpenChange={(openKeys) => handleSubMenuClick(openKeys)}
        />
      </Sider>
    </>
  );
};

export default CatalogSider;
