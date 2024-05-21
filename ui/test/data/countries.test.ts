import countries from '../../src/data/countries';
import { expect, test } from '@jest/globals';

test('Test Countries', () => {
  expect(countries.length).toBe(252);
});