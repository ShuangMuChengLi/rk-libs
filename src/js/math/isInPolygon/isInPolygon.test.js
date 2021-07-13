import { isInPolygon } from './isInPolygon';
test('isInPolygon', () => {
  expect(isInPolygon([1, 1], [[0, 0], [2, 0], [2, 2], [0, 2]])).toBe(true);
});
