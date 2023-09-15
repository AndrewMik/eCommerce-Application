import { DiscountCode } from '@commercetools/platform-sdk';
import { Button, Card, Tooltip } from 'antd';
import { useState } from 'react';

const { Meta } = Card;

interface Props {
  promo: DiscountCode;
}

const Promo = (props: Props) => {
  const { promo } = props;
  const [toolTipText, setToolTipText] = useState('copy');
  const promoDescription = promo.description?.en.split('|').slice(1);
  const promoDiscount = promo.description?.en.split('|').slice(0, 1);

  if (!promo) throw new Error('No attributes found');

  return (
    <Card style={{ width: 300, marginTop: 16, textAlign: 'center', height: '250px' }}>
      <Meta
        title={promo.name && promo.name.en}
        description={
          <div style={{ color: 'black', fontWeight: 'bolder', textAlign: 'center' }}>
            <span style={{ marginRight: 10 }}>code:</span>
            <Tooltip placement="rightTop" title={toolTipText} mouseLeaveDelay={0} overlayStyle={{ fontSize: '12px' }}>
              <Button
                style={{ fontWeight: 'bolder' }}
                onClick={() => {
                  navigator.clipboard.writeText(promo.code);
                  setToolTipText('copied');
                }}
              >
                {promo.code}
              </Button>
            </Tooltip>
          </div>
        }
      />
      <Meta style={{ marginTop: 16, textAlign: 'center', fontSize: '12px' }} title={promoDiscount} />
      <Meta style={{ marginTop: 16, textAlign: 'center', fontSize: '12px' }} description={promoDescription} />
    </Card>
  );
};

export default Promo;
