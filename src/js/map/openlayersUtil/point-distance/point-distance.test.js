import { getDistance } from './point-distance';

test('getDistance', () => {
  const result = getDistance([116.398232, 39.929004], [116.408203, 39.929405] );
  expect(result).toBe(0.8523);
});
