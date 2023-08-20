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
  REGISTERED = 'Registered',
  ACCOUNT_EXISTS = 'Account exists',
}

export enum NotificationDescription {
  CUSTOMER_ACCOUNT_DOES_NOT_EXIST = 'Incorrect email or password.',
  CUSTOMER_ACCOUNT_AUTHENTICATED = 'Login successful!',
  CUSTOMER_ACCOUNT_UNKNOWN_ERROR = 'Something went wrong. Try again later.',
  CUSTOMER_ACCOUNT_REGISTERED = "Registration successful! You're now logged in.",
  CUSTOMER_ACCOUNT_EXISTS = 'Account with this email address already exists. Please log in or try a different email.',
  CUSTOMER_LOGGED_IN_ALREADY = 'You are signed in. To register or switch accounts, please sign out first.',
}
