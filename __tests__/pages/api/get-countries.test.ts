import { getName } from 'country-list';
import getCountries from '../../../pages/api/get-countries';

jest.mock('country-list', () => ({
  getName: jest.fn(),
}));

const mockedExecute = jest.fn();

// Mocking the Client class and its methods
jest.mock('../../../pages/api/client', () => {
  return jest.fn().mockImplementation(() => {
    return {
      clientCredentialsClient: {
        zones: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        execute: mockedExecute,
      },
    };
  });
});

describe('getCountries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if response does not contain body results', async () => {
    mockedExecute.mockResolvedValueOnce({});

    const result = await getCountries();
    expect(result).toEqual([]);
  });

  it('should return countries from the response', async () => {
    mockedExecute.mockResolvedValueOnce({
      body: {
        results: [
          {
            locations: [{ country: 'US' }, { country: 'CA' }],
          },
        ],
      },
    });

    // Mocking the getName function to return country names for the given codes
    (getName as jest.MockedFunction<typeof getName>).mockImplementation((code) => {
      switch (code) {
        case 'US':
          return 'United States';
        case 'CA':
          return 'Canada';
        default:
          return undefined;
      }
    });

    const result = await getCountries();
    expect(result).toEqual(['United States', 'Canada']);
  });

  it('should not include duplicates', async () => {
    mockedExecute.mockResolvedValueOnce({
      body: {
        results: [
          {
            locations: [{ country: 'US' }, { country: 'US' }],
          },
        ],
      },
    });

    (getName as jest.MockedFunction<typeof getName>).mockReturnValue('United States');

    const result = await getCountries();
    expect(result).toEqual(['United States']);
  });
});
