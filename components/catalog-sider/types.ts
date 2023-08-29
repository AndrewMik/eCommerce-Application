// import { Product } from '../../types/types';
import { ProductProjection } from '@commercetools/platform-sdk';

export enum Filter {
  Brand = 'brand',
  Age = 'age-range',
}

export interface AttributeValue {
  key: string;
  label: string;
  onClick?: () => void;
}

export interface CatalogSiderProps {
  brands: AttributeValue[] | null;
  ageRange: AttributeValue[] | null;
  getUpdatedProductCards: (cards: ProductProjection[] | number) => void;
}
