import { rkMath } from './rk-math';
test('getBaseLog', () => {
  expect(rkMath.getBaseLog(10, 100)).toBe(2);
});

test('isOdd', () => {
  expect(rkMath.isOdd(2)).toBe(false);
  expect(rkMath.isOdd(1)).toBe(true);
});
