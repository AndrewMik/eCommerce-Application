import { LineItem } from '@commercetools/platform-sdk';
import { Button, Input } from 'antd';
import { useState } from 'react';

interface Props {
  item: LineItem;
}

const minQuantity = 1;
const maxQuantity = 9999;

const ItemQuantity = ({ item }: Props) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue > 0) {
      setQuantity(newValue);
    } else {
      setQuantity(minQuantity);
    }
  };

  return (
    <>
      <Button onClick={() => setQuantity(quantity - 1)} disabled={quantity === minQuantity}>
        -
      </Button>
      <Input
        value={quantity}
        style={{ width: 70, margin: '0 5px', textAlign: 'center' }}
        maxLength={4}
        onChange={handleQuantityChange}
      ></Input>
      <Button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= maxQuantity}>
        +
      </Button>
    </>
  );
};

export default ItemQuantity;
