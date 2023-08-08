import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { getEnvVariable } from '@/helpers/api.helpers';
import { ClientEnvData } from './types';

const projectKey = getEnvVariable(ClientEnvData.KEY);
const clientId = getEnvVariable(ClientEnvData.ID);
const clientSecret = getEnvVariable(ClientEnvData.SECRET);
const authUrl = getEnvVariable(ClientEnvData.AUTH_URL);
const apiUrl = getEnvVariable(ClientEnvData.API_URL);
const scopesString = getEnvVariable(ClientEnvData.SCOPES);
const scopes = scopesString.split(',');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  fetch,
};

const client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export default client;
