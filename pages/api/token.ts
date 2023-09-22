import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class Token implements TokenCache {
  private token: TokenStore;

  constructor() {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }

  get(): TokenStore {
    return this.token;
  }

  set(cache: TokenStore): void {
    this.token = cache;
  }

  clear(): void {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }
}

export default Token;
