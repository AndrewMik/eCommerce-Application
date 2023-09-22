import { TokenStore } from '@commercetools/sdk-client-v2';
import Token from '../../../pages/api/token';

describe('Token', () => {
  it('should initialize with default values', () => {
    const tokenInstance = new Token();
    const currentToken = tokenInstance.get();

    expect(currentToken).toEqual({
      token: '',
      refreshToken: '',
      expirationTime: 0,
    });
  });

  it('should set and get token value correctly', () => {
    const tokenInstance = new Token();

    const mockTokenValue: TokenStore = {
      token: 'mocked-token',
      expirationTime: Date.now() + 3600 * 1000,
    };

    tokenInstance.set(mockTokenValue);
    const currentToken = tokenInstance.get();

    expect(currentToken).toEqual(mockTokenValue);
  });
});
