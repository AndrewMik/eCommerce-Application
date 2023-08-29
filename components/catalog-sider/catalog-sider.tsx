import { Layout, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { Filter, AttributeValue, CatalogSiderProps } from './types';

const { Sider } = Layout;

const CatalogSider = (props: CatalogSiderProps) => {
  const { brands, ageRange } = props;

  const [filters] = useState<string[]>([Filter.Brand, Filter.Age]);
  const [selected, setSelected] = useState<{ [key: string]: string }>({});

  const handleSelect = (parentKey: string, selectedKey: string) => {
    setSelected({
      ...selected,
      [parentKey]: selectedKey,
    });
  };

  const items2: MenuProps['items'] = filters.map((option) => {
    const key = String(option);

    let childrenItems: AttributeValue[] = [];

    switch (key) {
      case Filter.Brand:
        if (brands) {
          childrenItems = brands.map((brand) => ({
            key: `sub${brand.label}`,
            label: `${brand.label}`,
            onClick: () => handleSelect(key, brand.label),
          }));
        }
        break;
      case Filter.Age:
        if (ageRange) {
          childrenItems = ageRange.map((age) => ({
            key: `sub${age.label}`,
            label: `${age.label}`,
            onClick: () => handleSelect(key, age.label),
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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: 'calc(100% - 70px)', borderRight: 0, marginTop: '10px' }}
          items={items2}
        />
      </Sider>
    </>
  );
};

export default CatalogSider;
