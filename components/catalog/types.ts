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

export interface AttributeValue {
  key: string;
  label: string;
}

export interface AttributeGroup {
  [key: string]: AttributeValue;
}

export interface AttributeData {
  [attributeName: string]: AttributeGroup;
}
