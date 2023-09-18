import Client from '../pages/api/client';

function handleRefreshTokenInLocalStorage() {
  const token = Client.token.get();
  if (token.refreshToken && token.refreshToken?.length > 0) {
    localStorage.setItem('refreshToken', token.refreshToken as string);
  }
}

export default handleRefreshTokenInLocalStorage;
