import { pointCluster } from './point-cluster';

let list = [
  {
    lon: 116.399166,
    lat: 39.919836
  },
  {
    lon: 116.400909,
    lat: 39.920057
  },
  {
    lon: 116.408455,
    lat: 39.920292
  },
];
test('pointCluster', () => {
  let result = pointCluster({
    list,
    d: 0.5,
    lonName: 'lon',
    latName: 'lat'
  });
  expect(result.length).toBe(2);
});
