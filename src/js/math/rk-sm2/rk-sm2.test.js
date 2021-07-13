import { rkSm2 } from './rk-sm2.js';
test('md5Sha', () => {
  let keypair = rkSm2.generateKeyPairHex();
  console.log(keypair)
  let temp = rkSm2.encrypt('123456', keypair.publicKey);
  let result = rkSm2.decrypt(temp, keypair.privateKey);
  expect(result).toBe('123456');
});
