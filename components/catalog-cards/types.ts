export interface AttributeValue {
  key: string;
  label: string;
}

export interface UniqueBrands {
  [key: string]: AttributeValue;
}

export interface UniqueAges {
  [key: string]: AttributeValue;
}

export enum Filter {
  Brand = 'Brand',
  Age = 'Age',
}
