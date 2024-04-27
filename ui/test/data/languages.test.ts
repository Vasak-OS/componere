import languages from '../../src/data/languages';
import { expect, test } from '@jest/globals';

test('Test Languages', () => {
  expect(languages.length).toBe(186);
});
