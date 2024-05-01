import { randomColor } from '../../src/utils/colorUtils';
import { expect, test } from '@jest/globals';

test('Test Random Color swap', () => {
  const color = randomColor('swap');
  expect(color).toMatch(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/);
});

test('Test Random Color ext4', () => {
  const color = randomColor('ext4');
  expect(color).toMatch(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/);
});

test('Test Random Color fat32', () => {
  const color = randomColor('fat32');
  expect(color).toMatch(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/);
});

test('Test Random Color Root', () => {
  const color = randomColor('Root');
  expect(color).toMatch(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/);
});

test('Test Random Color Swap', () => {
  const color = randomColor('Swap');
  expect(color).toMatch(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/);
});
