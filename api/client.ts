import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

class Client {
  private projectKey: string;
  private clientSecret: string;
  private clientId: string;
  private authUrl: string;
  private apiUrl: string;
  private scopes: string[];
  private cachedClients: {
    clientCredentials?: ByProjectKeyRequestBuilder;
    passwordFlow?: ByProjectKeyRequestBuilder;
    anonymous?: ByProjectKeyRequestBuilder;
  } = {};

  constructor() {
    this.projectKey = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY || '';
    this.clientSecret = process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET || '';
    this.clientId = process.env.NEXT_PUBLIC_CTP_CLIENT_ID || '';
    this.authUrl = process.env.NEXT_PUBLIC_CTP_AUTH_URL || '';
    this.apiUrl = process.env.NEXT_PUBLIC_CTP_API_URL || '';
    this.scopes = (process.env.NEXT_PUBLIC_CTP_SCOPES || '').split(' ');
  }

  private get httpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: this.apiUrl,
      fetch,
    };
  }

  get clientCredentialsClient() {
    if (!this.cachedClients.clientCredentials) {
      const authMiddlewareOptions: AuthMiddlewareOptions = {
        host: this.authUrl,
        projectKey: this.projectKey,
        credentials: {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
        },
        scopes: this.scopes,
        fetch,
      };

      const client = new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .build();

      this.cachedClients.clientCredentials = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: this.projectKey,
      });
      return this.cachedClients.clientCredentials;
    }

    return this.cachedClients.clientCredentials;
  }

  getPasswordFlowClient(email: string, password: string) {
    if (!this.cachedClients.passwordFlow) {
      const passwordFlowOptions: PasswordAuthMiddlewareOptions = {
        host: this.authUrl,
        projectKey: this.projectKey,
        credentials: {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          user: {
            username: email,
            password,
          },
        },
        fetch,
      };

      const client = new ClientBuilder()
        .withPasswordFlow(passwordFlowOptions)
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .build();

      this.cachedClients.passwordFlow = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: this.projectKey,
      });
      return this.cachedClients.passwordFlow;
    }

    return this.cachedClients.passwordFlow;
  }

  get anonymousClient() {
    if (!this.cachedClients.anonymous) {
      const anonymousFlowOptions: AnonymousAuthMiddlewareOptions = {
        host: this.authUrl,
        projectKey: this.projectKey,
        credentials: {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
        },
        fetch,
      };

      const client = new ClientBuilder()
        .withAnonymousSessionFlow(anonymousFlowOptions)
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .build();

      this.cachedClients.anonymous = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: this.projectKey,
      });
      return this.cachedClients.anonymous;
    }

    return this.cachedClients.anonymous;
  }
}

export default Client;
