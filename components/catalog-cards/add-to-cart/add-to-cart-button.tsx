import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CSSProperties, useState } from 'react';

type AddToCartProps = {
  productId: string;
  style?: CSSProperties;
};

const AddToCartButton = ({ productId, style }: AddToCartProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  return (
    <Button
      key={productId}
      disabled={isButtonDisabled}
      onClick={(event) => {
        event.preventDefault();
        setIsButtonDisabled(true);
      }}
      style={style}
    >
      <ShoppingCartOutlined />
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
