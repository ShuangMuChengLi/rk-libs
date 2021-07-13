import md5Sha from './md5-sha';
test('md5Sha', () => {
  expect(md5Sha('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
});
