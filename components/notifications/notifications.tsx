'use client';

import { notification } from 'antd';
import { useContext, useEffect } from 'react';
import {
  NotificationType,
  NotificationPlacement,
  NotificationMessage,
  NotificationDescription,
} from './notifications.types';
import { AuthContext } from '../../context/authorization-context';

const Notifications = () => {
  const [api, contextHolder] = notification.useNotification();
  const { toggleNotificationForLogIn, logInStatusCode } = useContext(AuthContext);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement,
  ) => {
    api[type]({
      message,
      description,
      placement,
    });
  };

  useEffect(() => {
    if (logInStatusCode) {
      if (logInStatusCode === 200) {
        openNotificationWithIcon(
          NotificationType.SUCCESS,
          NotificationMessage.AUTENTICATED,
          NotificationDescription.CUSTOMER_ACCOUNT_AUTHENTICATED,
          NotificationPlacement.BOTTOM,
        );
      } else if (logInStatusCode === 400) {
        openNotificationWithIcon(
          NotificationType.ERROR,
          NotificationMessage.INVALID_CREDENTIALS,
          NotificationDescription.CUSTOMER_ACCOUNT_DOES_NOT_EXIST,
          NotificationPlacement.BOTTOM,
        );
      } else {
        openNotificationWithIcon(
          NotificationType.ERROR,
          NotificationMessage.UNKNOWN_ERROR,
          NotificationDescription.CUSTOMER_ACCOUNT_UNKNOWN_ERROR,
          NotificationPlacement.BOTTOM,
        );
      }
    }
  }, [toggleNotificationForLogIn]);

  return <>{contextHolder}</>;
};

export default Notifications;
