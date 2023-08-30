import { Layout, Menu, MenuProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getCapitalizedFirstLabel } from '@/utils/filter';
import { CatalogSiderProps, MenuKeyProps } from './types';
import { AttributeData } from '../catalog-cards/types';

const { Sider } = Layout;

const CatalogSider = (props: CatalogSiderProps) => {
  const { attributeData } = props;
  const [filterNames, setFilterNames] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [allSelectedKeys, setAllSelectedKeys] = useState<string[][]>([]);

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

  const handleSelect = (menuProps: MenuKeyProps) => {
    const { keyPath } = menuProps;

    setSelectedKey(keyPath);
    setAllSelectedKeys((prevValue) => {
      return [...prevValue, keyPath];
    });
  };

  const handleDeselect = (menuProps: MenuKeyProps) => {
    const { keyPath } = menuProps;

    setSelectedKey([]);
    setAllSelectedKeys((prevValue) => {
      const filtered = prevValue.filter((existingKeyPath) => existingKeyPath[0] !== keyPath[0]);
      return filtered;
    });
  };

  const filters = useMemo(() => {
    return attributeData ? displayFilteres(attributeData) : [];
  }, [attributeData, selectedKey]);

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
          selectedKeys={allSelectedKeys.map((key) => key[0])}
          onSelect={({ keyPath }) => handleSelect({ keyPath })}
          onDeselect={({ keyPath }) => handleDeselect({ keyPath })}
        />
      </Sider>
    </>
  );
};

export default CatalogSider;
