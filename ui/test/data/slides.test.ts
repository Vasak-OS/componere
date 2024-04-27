import slides from '../../src/data/slides';
import { expect, test } from '@jest/globals';

test('Test Slides', () => {
  expect(slides.length).toBe(2);
});