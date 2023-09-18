import { Button, Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import { SetStateAction, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { CheckSquareOutlined, DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AttributeData } from './types';

const { Sider } = Layout;

interface MenuKeyProps {
  keyPath: string[];
}

interface AllCategories {
  mainCategory: Category;
  subCategory: Category[];
}

interface CatalogSiderProps {
  attributeData: AttributeData | null;
  allSelectedKeys: string[][];
  setAllSelectedKeys: (value: SetStateAction<string[][]>) => void;
  setCategory: (value: SetStateAction<string[]>) => void;
  allCategories: AllCategories[] | null;
  displayCategories: (categories: AllCategories[]) => MenuProps['items'];
  displayFilters: (attributes: AttributeData) => MenuProps['items'];
  handleSelect: (menuProps: MenuKeyProps) => void;
  handleDeselect: (menuProps: MenuKeyProps) => void;
  itemsForName: MenuProps['items'];
  itemsForPrice: MenuProps['items'];
  chosenSorting: string;
  setSortString: (value: SetStateAction<string>) => void;
  setChosenSorting: (value: SetStateAction<string>) => void;
}

const CatalogSider = ({
  attributeData,
  setCategory,
  allCategories,
  displayCategories,
  displayFilters,
  handleSelect,
  handleDeselect,
  allSelectedKeys,
  setAllSelectedKeys,
  itemsForName,
  itemsForPrice,
  chosenSorting,
  setSortString,
  setChosenSorting,
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
          backgroundColor: 'white',
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
            marginLeft: '90px',
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
            setSortString('');
            setChosenSorting('');
          }}
        >
          reset filters/sort options
        </Button>
        <Menu
          mode="inline"
          style={{ borderRight: 0, marginTop: '0px', overflowY: 'scroll', zIndex: 100 }}
          items={
            allCategories && attributeData
              ? [...(displayCategories(allCategories) || []), ...(displayFilters(attributeData) || [])]
              : []
          }
          selectedKeys={allSelectedKeys.map((key) => key[0])}
          onSelect={({ keyPath }) => handleSelect({ keyPath })}
          onDeselect={({ keyPath }) => handleDeselect({ keyPath })}
          // onOpenChange={(openKeys) => !collapsed && handleSubMenuClick(openKeys)}
        />
        <Space>
          {chosenSorting.length > 0 ? (
            <Space style={{ marginLeft: '25px', marginBlock: '20px', fontWeight: 'bold', color: 'rgb(36, 55, 99)' }}>
              <CheckSquareOutlined />
              {chosenSorting}
            </Space>
          ) : (
            ''
          )}
        </Space>
        <Space style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Dropdown menu={{ items: itemsForName }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ marginLeft: '30px', marginTop: '20px', color: 'rgb(36, 55, 99)', fontWeight: 'bold' }}>
                Sort by name:
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items: itemsForPrice }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ marginLeft: '30px', marginTop: '20px', color: 'rgb(36, 55, 99)', fontWeight: 'bold' }}>
                Sort by price:
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
      </Sider>
    </>
  );
};

export default CatalogSider;
