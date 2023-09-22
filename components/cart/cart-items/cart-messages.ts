import { MessageInstance } from 'antd/es/message/interface';

export const displayMessageLoaded = (messageApi: MessageInstance, key: string) => {
  messageApi.open({
    key,
    type: 'success',
    content: 'Promo Discount applied!',
    duration: 2,
  });
};

export const displayMessageWrongPromo = (messageApi: MessageInstance, key: string) => {
  messageApi.open({
    key,
    type: 'error',
    content: 'Provided promo does not exist',
    duration: 2,
  });
};

export const displayMessageRemoved = (messageApi: MessageInstance, key: string) => {
  messageApi.open({
    key,
    type: 'warning',
    content: 'Discount removed!',
    duration: 2,
  });
};
