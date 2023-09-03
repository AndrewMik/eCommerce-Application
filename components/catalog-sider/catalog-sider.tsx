import { Button, Layout, Menu, MenuProps } from 'antd';
import { SetStateAction, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MenuKeyProps, AllCategories } from './types';
import { AttributeData } from '../catalog-cards/types';

const { Sider } = Layout;

interface CatalogSiderProps {
  attributeData: AttributeData | null;
  getUpdatedProductCards: (cards: ProductProjection[] | number) => void;
  allSelectedKeys: string[][];
  setAllSelectedKeys: (value: SetStateAction<string[][]>) => void;
  setCategory: (value: SetStateAction<string[]>) => void;
  allCategories: AllCategories[] | null;
  displayCategories: (categories: AllCategories[]) => MenuProps['items'];
  displayFilteres: (attributes: AttributeData) => MenuProps['items'];
  handleSelect: (menuProps: MenuKeyProps) => void;
  handleDeselect: (menuProps: MenuKeyProps) => void;
  handleSubMenuClick: (openKeys: string[]) => void;
}

const CatalogSider = ({
  attributeData,
  setCategory,
  allCategories,
  displayCategories,
  displayFilteres,
  handleSelect,
  handleDeselect,
  handleSubMenuClick,
  allSelectedKeys,
  setAllSelectedKeys,
}: CatalogSiderProps) => {
  const [collapsed, setCollapsed] = useState(true);

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
          marginTop: '0px',
          width: 64,
          height: 64,
          zIndex: 101,
          backgroundColor: 'rgba(23, 48, 173, 0.09)',
        }}
      />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        width={300}
        style={{
          paddingTop: '100px',
          borderRadius: '5px',
          height: 'calc(100vh)',
          position: 'fixed',
          left: 0,
          top: '0px',
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
            top: '-15px',
            zIndex: 101,
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
          style={{ borderRight: 0, marginTop: '0px', overflowY: 'scroll', zIndex: 100 }}
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
