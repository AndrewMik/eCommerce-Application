import { ErrorResponse } from '@commercetools/platform-sdk';

export const handleErrorResponse = (response: ErrorResponse) => {
  if (response.statusCode === 400 || response.statusCode === 404) {
    return;
  } else {
    console.error('Unexpected error:', response);
  }
};
