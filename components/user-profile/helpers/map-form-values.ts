import { BaseAddress } from '@commercetools/platform-sdk';

interface InputData {
  [key: string]: string | undefined;
}

interface ResultData {
  [key: string]: BaseAddress;
}

function mapFormValues(inputObj: InputData, properties: string[]): ResultData {
  const result: ResultData = {};

  Object.keys(inputObj).forEach((key) => {
    const matches = key.match(/(.*?)_(\w+)$/);

    if (matches && properties.includes(matches[1])) {
      const prop = matches[1];
      const id = matches[2];

      if (result[id]) {
        (result[id] as any)[prop] = inputObj[key];
      }
    }
  });

  return result;
}

export default mapFormValues;
