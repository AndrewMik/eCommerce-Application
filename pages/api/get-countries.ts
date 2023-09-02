import { getName } from 'country-list';
import Client from './client';

async function getCountries(): Promise<string[]> {
  const client = Client.getInstance().clientCredentialsClient;
  const response = await client.zones().get().execute();

  if (!response.body?.results) {
    return [];
  }

  const countries: string[] = [];
  response.body.results.forEach((zone) => {
    zone.locations.forEach((location) => {
      const fullCountryName = getName(location.country);
      if (fullCountryName && !countries.includes(fullCountryName)) {
        countries.push(fullCountryName);
      }
    });
  });

  return countries;
}

export default getCountries;
