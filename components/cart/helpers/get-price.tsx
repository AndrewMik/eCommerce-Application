import { TypedMoney } from '@commercetools/platform-sdk';

const getCurrency = (priceValue: TypedMoney) => {
  return priceValue.currencyCode === 'USD' ? '$' : `${priceValue.currencyCode} `;
};

const getPrice = (priceValue: TypedMoney) => {
  return `${priceValue.centAmount.toString().slice(0, -2)}.${priceValue.centAmount.toString().slice(-2)}`;
};

export { getCurrency, getPrice };
