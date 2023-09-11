import { ErrorResponse } from '@commercetools/platform-sdk';

export const handleErrorResponse = (response: ErrorResponse) => {
  if (response.statusCode === 400 || response.statusCode === 404) {
    console.error(response);
  } else {
    console.error('Unexpected error:', response);
  }
};
