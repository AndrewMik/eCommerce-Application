export enum NotificationPlacement {
  TOP = 'top',
  BOTTOM = 'bottom',
  BOTTOM_RIGHT = 'bottomRight',
  TOP_LEFT = 'topLeft',
  TOP_RIGHT = 'topRight',
  BOTTOM_LEFT = 'bottomLeft',
}

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum NotificationMessage {
  INVALID_CREDENTIALS = 'Invalid credentials',
  AUTENTICATED = 'Authenticated',
  UNKNOWN_ERROR = 'Unknown error',
}

export enum NotificationDescription {
  CUSTOMER_ACCOUNT_DOES_NOT_EXIST = 'Incorrect email or password',
  CUSTOMER_ACCOUNT_AUTHENTICATED = 'You successfully logged in',
  CUSTOMER_ACCOUNT_UNKNOWN_ERROR = 'Something went wrong. Try again later',
}
