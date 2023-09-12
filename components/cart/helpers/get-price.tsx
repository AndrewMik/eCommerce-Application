import { Cart, LineItem, TypedMoney } from '@commercetools/platform-sdk';

const getCurrency = (priceValue: TypedMoney) => {
  return priceValue.currencyCode === 'USD' ? '$' : `${priceValue.currencyCode} `;
};

const getPriceString = (priceValue: TypedMoney) => {
  return `${priceValue.centAmount.toString().slice(0, -2)}.${priceValue.centAmount.toString().slice(-2)}`;
};

function getPrice(item: LineItem) {
  if (item.price.discounted) {
    return (
      <>
        <s>
          {getCurrency(item.price.value)}
          {getPriceString(item.price.value)}
        </s>
        <b style={{ fontSize: 16, marginLeft: 5 }}>
          {getCurrency(item.price.discounted.value)}
          {getPriceString(item.price.discounted.value)}
        </b>
      </>
    );
  }

  return (
    <b style={{ fontSize: 20 }}>
      {getCurrency(item.price.value)}
      {getPriceString(item.price.value)}
    </b>
  );
}

function getTotalItemPrice(item: LineItem) {
  return (
    <b style={{ fontSize: 20, color: 'green' }}>
      {getCurrency(item.totalPrice)}
      {getPriceString(item.totalPrice)}
    </b>
  );
}

function getTotalPrice(cart: Cart) {
  return (
    <b style={{ color: 'blue' }}>
      {getCurrency(cart.totalPrice)}
      {getPriceString(cart.totalPrice)}
    </b>
  );
}

export { getPrice, getTotalPrice, getTotalItemPrice };
