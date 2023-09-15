import { LineItem, ProductDiscountReference, TypedMoney } from '@commercetools/platform-sdk';
import { getCurrency, getPrice } from '../helpers/get-price';

interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}
interface LineItemExpanded extends LineItem {
  discountedPrice: DiscountedPrice;
}

interface Props {
  item: LineItemExpanded;
}

const ItemPriceWithCartDiscount = ({ item }: Props) => {
  const currency = getCurrency(item.discountedPrice.value);

  return (
    <>
      <b style={{ fontSize: 16, marginLeft: 5 }}>
        {currency}
        {getPrice(item.discountedPrice.value)}
      </b>
    </>
  );
};

export default ItemPriceWithCartDiscount;
