import { Layout, Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import { CatalogSiderProps } from './types';
import { AttributeData } from '../catalog-cards/types';

const { Sider } = Layout;

const CatalogSider = (props: CatalogSiderProps) => {
  const { attributeData } = props;
  const [filterNames, setFilterNames] = useState<string[]>([]);
  const [filters, setFilters] = useState<MenuProps['items'] | undefined>(undefined);

  const displayFilteres = (attributes: AttributeData): MenuProps['items'] => {
    const items2: MenuProps['items'] = filterNames.map((name) => {
      const label = getCapitalizedFirstLabel(name);
      const childrenData = Object.values(attributes[name]);
      return {
        key: name,
        label: `${label}`,
        style: { fontSize: '12px', maxHeight: '500px', overflowY: 'scroll' },

        children: childrenData.map((data) => {
          return {
            key: data.key,
            label: `${data.label}`,
            style: { paddingLeft: '20px', height: '20px' },
          };
        }),
      };
    });
    return items2;
  };

  useEffect(() => {
    if (!attributeData) return;
    const attributeNames = Object.keys(attributeData);
    setFilterNames(attributeNames);
    const items = displayFilteres(attributeData);
    setFilters(items);
  }, [attributeData]);

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
          items={filters}
        />
      </Sider>
    </>
  );
};

export default CatalogSider;
