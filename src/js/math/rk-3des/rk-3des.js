const CryptoJS = require('crypto-js');
// const key = CryptoJS.enc.Utf8.parse('4c43c365a4ac05b91eb5fa95'); // key

export function encrypt3Des(string, key){
  const parsedKey = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.TripleDES.encrypt(string, parsedKey, {
    mode: CryptoJS.mode.ECB
  });

  return encrypted.toString(); // 返回加密后的字符串
}

export function decrypt3Des(encryptedSting, key) {
  const parsedKey = CryptoJS.enc.Utf8.parse(key);
  return CryptoJS.TripleDES.decrypt(encryptedSting, parsedKey, {
    mode: CryptoJS.mode.ECB
  }).toString(CryptoJS.enc.Utf8); // 返回解密后的字符串
}
