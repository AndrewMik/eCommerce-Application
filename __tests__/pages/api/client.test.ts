import Client from '../../../pages/api/client';

global.fetch = jest.fn();

jest.mock('@commercetools/sdk-client-v2', () => {
  return {
    ClientBuilder: jest.fn().mockImplementation(() => {
      return {
        withClientCredentialsFlow: jest.fn().mockReturnThis(),
        withPasswordFlow: jest.fn().mockReturnThis(),
        withAnonymousSessionFlow: jest.fn().mockReturnThis(),
        withHttpMiddleware: jest.fn().mockReturnThis(),
        build: jest.fn(),
      };
    }),
  };
});

jest.mock('@commercetools/platform-sdk', () => ({
  createApiBuilderFromCtpClient: jest.fn().mockReturnValue({
    withProjectKey: jest.fn().mockReturnValue({}),
  }),
}));

describe('Client', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with environment variables', () => {
    const client = Client.getInstance();
    expect(client).toBeDefined();
  });

  it('should get clientCredentialsClient', () => {
    const client = Client.getInstance();
    const result = client.clientCredentialsClient;
    expect(result).toBeDefined();
  });

  it('should get getPasswordFlowClient', () => {
    const client = Client.getInstance();
    const result = client.getPasswordFlowClient('test@example.com', 'password123');
    expect(result).toBeDefined();
  });

  it('should get anonymousClient', () => {
    const client = Client.getInstance();
    const result = client.anonymousClient;
    expect(result).toBeDefined();
  });

  it('should clear cached clients', () => {
    const client = Client.getInstance();
    client.clearApiRoot();
    expect(client.clientCredentialsClient).toBeDefined();
    expect(client.getPasswordFlowClient('test@example.com', 'password123')).toBeDefined();
    expect(client.anonymousClient).toBeDefined();
  });
});
