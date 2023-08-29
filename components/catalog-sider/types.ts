export enum Filter {
  Brand = 'Brand',
  Age = 'Age',
}

export interface AttributeValue {
  key: string;
  label: string;
  onClick?: () => void;
}

export interface CatalogSiderProps {
  brands: AttributeValue[] | null;
  ageRange: AttributeValue[] | null;
}
