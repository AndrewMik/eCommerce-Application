import { Typography } from 'antd';

import { transformCentToDollar } from '../../utils/price';
import FontColors from './product.data';

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
      <Title style={{ color: FontColors.BASE }}>{name}</Title>
      <Title level={5} style={{ color: FontColors.BASE_BRIGHT }}>
        {brand}
      </Title>
      <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8, marginBottom: 16 }}>
        {discountedPrice ? (
          <>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: FontColors.ACCENT_COLD }}>
              ${discountedPrice ? transformCentToDollar(discountedPrice) : transformCentToDollar(0)}
            </Text>
            <Text style={{ fontSize: 24, textDecoration: 'line-through', color: 'grey', marginLeft: 16 }}>
              ${regularPrice ? transformCentToDollar(regularPrice) : transformCentToDollar(0)}
            </Text>
          </>
        ) : (
          <Text style={{ fontSize: 24, color: FontColors.BASE }}>
            ${regularPrice ? transformCentToDollar(regularPrice) : transformCentToDollar(0)}
          </Text>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
