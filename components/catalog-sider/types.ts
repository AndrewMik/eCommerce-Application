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
}
