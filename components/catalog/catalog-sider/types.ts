import { Category } from '@commercetools/platform-sdk';
import { CSSProperties } from '@ant-design/cssinjs/lib/hooks/useStyleRegister';

export enum Filter {
  Brand = 'brand',
  Age = 'age-range',
  Material = 'material',
  Gender = 'gender',
}

export interface AttributeValue {
  key: string;
  label: string;
  onClick?: () => void;
  style: CSSProperties;
}

export interface MenuKeyProps {
  keyPath: string[];
}

export interface AllCategories {
  mainCategory: Category;
  subCategory: Category[];
}
