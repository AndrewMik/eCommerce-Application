import { addNumbers } from './index';

describe('addNumbers function', () => {
  test('should add two positive numbers correctly', () => {
    const result = addNumbers(2, 3);
    expect(result).toBe(5);
  });

  test('should add a positive and a negative number correctly', () => {
    const result = addNumbers(10, -5);
    expect(result).toBe(5);
  });

  test('should add two negative numbers correctly', () => {
    const result = addNumbers(-3, -7);
    expect(result).toBe(-10);
  });
});
