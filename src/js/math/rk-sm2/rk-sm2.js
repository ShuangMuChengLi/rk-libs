const sm2 = require('sm-crypto').sm2;
export const rkSm2 = {
  /**
   *
   * @return {{privateKey: *, publicKey: string}|{privateKey: *, publicKey: string}}
   */
  generateKeyPairHex(){
    return sm2.generateKeyPairHex();
  },
  /**
   * sm2 加密
   * @param msgString
   * @param publicKey
   * @param cipherMode // 1 - C1C3C2，0 - C1C2C3，默认为0
   */
  encrypt(msgString, publicKey, cipherMode = 0){
    if(!publicKey) {
      console.error('publicKey is null');
      return null;
    }

    if(!cipherMode) {
      cipherMode = 0;
    }

    return sm2.doEncrypt(msgString, publicKey, cipherMode);
  },
  /**
   * sm2 解密
   * @param encryptData
   * @param privateKey
   * @param cipherMode  // 1 - C1C3C2，0 - C1C2C3，默认为0
   */
  decrypt(encryptData, privateKey, cipherMode = 0){
    if(!privateKey) {
      console.error('privateKey is null');
      return null;
    }

    if(!cipherMode) {
      cipherMode = 0;
    }

    return sm2.doDecrypt(encryptData, privateKey, cipherMode);
  },
};
