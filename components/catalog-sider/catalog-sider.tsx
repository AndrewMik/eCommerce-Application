import { Layout, Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { Attribute } from '@commercetools/platform-sdk';
import getFilteredProducts from '@/pages/api/filter-products';
import { Filter, AttributeValue, CatalogSiderProps } from './types';

const { Sider } = Layout;

const CatalogSider = (props: CatalogSiderProps) => {
  const { brands, ageRange } = props;

  const [filters] = useState<string[]>([Filter.Brand, Filter.Age]);
  const [selected, setSelected] = useState<{ [key: string]: string }>({
    [Filter.Brand]: 'all brands',
    [Filter.Age]: 'all ages',
  });
  const [filterKey, setFilterKey] = useState<Attribute | null>(null);

  const handleSelect = (parentKey: string, selectedKey: string, key: string) => {
    const attribute = {
      name: parentKey,
      value: {
        key,
        label: selectedKey,
      },
    };

    setFilterKey(attribute);
    setSelected({
      ...selected,
      [parentKey]: selectedKey,
    });
  };

  const getFilteredProductsInfo = async () => {
    if (!filterKey) return;
    await getFilteredProducts(filterKey.name, filterKey.value);
  };

  useEffect(() => {
    getFilteredProductsInfo();
  }, [filterKey]);

  const items: MenuProps['items'] = filters.map((option) => {
    const key = String(option);

    let childrenItems: AttributeValue[] = [];

    switch (key) {
      case Filter.Brand:
        if (brands) {
          childrenItems = brands.map((brand) => ({
            key: `${brand.label}`,
            label: `${brand.label}`,
            onClick: () => handleSelect(key, brand.label, brand.key),
            style: { paddingLeft: '14px', height: '20px', lineHeight: '20px' },
          }));
        }
        break;
      case Filter.Age:
        if (ageRange) {
          childrenItems = ageRange.map((age) => ({
            key: `${age.label}`,
            label: `${age.label}`,
            onClick: () => handleSelect(key, age.label, age.key),
            style: { paddingLeft: '14px', height: '20px' },
          }));
        }
        break;
      default:
        childrenItems = [{ key: 'default', label: 'Unknown', onClick: () => {} }];
        break;
    }
    const selectedLabel = selected[key] ? `: ${selected[key]}` : '';

    return {
      key,
      label: `${key}${selectedLabel}`,
      children: childrenItems,
      style: { fontSize: '12px', maxHeight: '500px', overflowY: 'scroll' },
    };
  });

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
        <Menu
          mode="inline"
          style={{ height: 'calc(100% - 70px)', borderRight: 0, marginTop: '10px', overflowY: 'scroll' }}
          items={items}
        />
      </Sider>
    </>
  );
};

export default CatalogSider;
