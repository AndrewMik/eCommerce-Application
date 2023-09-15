import { DiscountCode } from '@commercetools/platform-sdk';
import { Button, Card, Tooltip } from 'antd';

const { Meta } = Card;

interface Props {
  promo: DiscountCode;
}

const Promo = (props: Props) => {
  const { promo } = props;

  if (!promo) throw new Error('No attributes found');

  return (
    <Card style={{ width: 300, marginTop: 16, textAlign: 'center' }}>
      <Meta
        title={promo.name && promo.name.en}
        description={
          <div style={{ color: 'black', fontWeight: 'bolder', textAlign: 'center' }}>
            <span style={{ marginRight: 10 }}>code:</span>
            <Tooltip placement="rightTop" title={'copied'} color="geekblue" trigger="click" mouseLeaveDelay={0.1}>
              <Button
                style={{ fontWeight: 'bolder' }}
                onClick={() => {
                  navigator.clipboard.writeText(promo.code);
                }}
              >
                {promo.code}
              </Button>
            </Tooltip>
          </div>
        }
      />
      <Meta
        style={{ marginTop: 16, textAlign: 'center', fontSize: '12px' }}
        description={promo.description && promo.description.en}
      />
    </Card>
  );
};

export default Promo;
