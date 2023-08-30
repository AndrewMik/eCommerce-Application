import { ProductProjection } from '@commercetools/platform-sdk';
import { CSSProperties } from '@ant-design/cssinjs/lib/hooks/useStyleRegister';
import { AttributeData } from '../catalog-cards/types';

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

export interface CatalogSiderProps {
  attributeData: AttributeData | null;
  getUpdatedProductCards: (cards: ProductProjection[] | number) => void;
}

export interface MenuKeyProps {
  keyPath: string[];
}
