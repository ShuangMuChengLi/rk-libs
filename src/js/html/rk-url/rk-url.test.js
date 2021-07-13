import { rkUrl } from './rk-url';
test('addParameter', () => {
  const url = 'https://www.linchaoqun.com/cms.html?token=token#/list';
  const searchParamsSet = {
    page: 1,
    size: 10
  };
  const result = rkUrl.addParameter(url, searchParamsSet);
  expect(result).toBe('https://www.linchaoqun.com/cms.html?token=token&page=1&size=10#/list');
});
