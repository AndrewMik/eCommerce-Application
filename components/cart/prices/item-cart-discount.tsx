import { LineItem, ProductDiscountReference, TypedMoney } from '@commercetools/platform-sdk';
import { getCurrency, getPrice } from '../helpers/get-price';

interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}
interface LineItemExpanded extends LineItem {
  discountedPrice?: DiscountedPrice;
}

interface Props {
  isPromoExists: boolean;
  item: LineItemExpanded;
}

const ItemPriceWithCartDiscount = ({ item }: Props) => {
  const currency = item.discountedPrice && getCurrency(item.discountedPrice.value);

  return item.discountedPrice ? (
    <>
      <s style={{ fontSize: 12, fontWeight: 'normal' }}>
        {currency}
        {item.price.discounted ? (
          <>
            <s style={{ fontSize: 12, fontWeight: 'normal' }}>{getPrice(item.price.value)}</s>
            <b style={{ fontSize: 12, marginLeft: 5, fontWeight: 'normal' }}>
              {getCurrency(item.price.discounted.value)}
              {getPrice(item.price.discounted.value)}
            </b>
          </>
        ) : (
          getPrice(item.price.value)
        )}
      </s>
      <b style={{ fontSize: 16, marginLeft: 5, color: 'red' }}>
        {currency}
        {getPrice(item.discountedPrice.value)}
      </b>
    </>
  ) : (
    <b style={{ fontSize: 16 }}>
      {currency}
      {getPrice(item.price.value)}
    </b>
  );
};

export default ItemPriceWithCartDiscount;
