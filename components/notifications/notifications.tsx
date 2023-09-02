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
  const {
    toggleNotificationForLogIn,
    logInStatusCode,
    registrationStatusCode,
    toggleNotificationForRegistration,
    toggleInactiveLinks,
    isLoggedIn,
  } = useContext(AuthContext);

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

  useEffect(() => {
    if (registrationStatusCode) {
      if (registrationStatusCode === 200 || registrationStatusCode === 201) {
        openNotificationWithIcon(
          NotificationType.SUCCESS,
          NotificationMessage.REGISTERED,
          NotificationDescription.CUSTOMER_ACCOUNT_REGISTERED,
          NotificationPlacement.BOTTOM,
        );
      } else if (registrationStatusCode === 400) {
        openNotificationWithIcon(
          NotificationType.ERROR,
          NotificationMessage.ACCOUNT_EXISTS,
          NotificationDescription.CUSTOMER_ACCOUNT_EXISTS,
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
  }, [toggleNotificationForRegistration]);

  useEffect(() => {
    if (toggleInactiveLinks == null) return;
    if (isLoggedIn) {
      openNotificationWithIcon(
        NotificationType.INFO,
        NotificationMessage.AUTENTICATED,
        NotificationDescription.CUSTOMER_LOGGED_IN_ALREADY,
        NotificationPlacement.BOTTOM,
      );
    }
  }, [toggleInactiveLinks]);

  return <>{contextHolder}</>;
};

export default Notifications;
