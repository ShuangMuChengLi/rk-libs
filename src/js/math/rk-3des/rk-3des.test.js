import { encrypt3Des, decrypt3Des } from './rk-3des';
test('rk-3des', () => {
  const key = '4c43c365a4ac05b91eb5fa95';
  const string = 'hello world';
  let temp = encrypt3Des(string, key);
  expect(temp).toBe('imEXXd89kx6/7e1dbAmy9Q==');
  let result = decrypt3Des(temp, key);
  expect(result).toBe('hello world');
});
