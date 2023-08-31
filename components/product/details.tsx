import { Typography } from 'antd';

import { transformCentToDollar } from '@/utils/price';

const { Text, Title } = Typography;

interface ProductDetailsProps {
  name: string;
  brand: string;
  regularPrice: number;
  discountedPrice: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, brand, regularPrice, discountedPrice }) => {
  return (
    <div>
      <Title>{name}</Title>
      <Text strong>{brand}</Text>
      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8, marginBottom: 16 }}>
        {discountedPrice ? (
          <>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              ${discountedPrice ? transformCentToDollar(discountedPrice) : transformCentToDollar(0)}
            </Text>
            <Text style={{ fontSize: 24, textDecoration: 'line-through', color: 'grey', marginLeft: 16 }}>
              ${regularPrice ? transformCentToDollar(regularPrice) : transformCentToDollar(0)}
            </Text>
          </>
        ) : (
          <Text style={{ fontSize: 24 }}>
            ${regularPrice ? transformCentToDollar(regularPrice) : transformCentToDollar(0)}
          </Text>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
