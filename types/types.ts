import { Attribute, LocalizedString, Image, Price } from '@commercetools/platform-sdk';

interface ProductAttribute {
  name: string;
  value: string;
}

interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface ProductPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  key?: string;
}

export interface Product {
  key: string;
  description: LocalizedString | undefined;
  attributes: Attribute[] | undefined;
  images: Image[] | undefined;
  prices: Price[] | undefined;
  name: LocalizedString;
}
