import Client from '../pages/api/client';

export function handleRefreshTokenInLocalStorage() {
  const token = Client.token.get();
  console.log(token);
  if (token.refreshToken && token.refreshToken?.length > 0) {
    localStorage.setItem('refreshToken', token.refreshToken as string);
  }
}
