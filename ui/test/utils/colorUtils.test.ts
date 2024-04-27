import { randomColor } from '../../src/utils/colorUtils';
import { expect, test } from '@jest/globals';

test('Test Random Color', () => {
  const color = randomColor();
  expect(color).toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);
});