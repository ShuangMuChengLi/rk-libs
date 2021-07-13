# sm2加密、解密
实现对数据的sm2加密、解密
## Download
[库文件下载](./js/math/rk-sm2.zip)
## dependence
sm-crypto
## Constructor
```
rkSm2
```
## methods
### rkSm2.generateKeyPairHex()
生成公钥私钥
#### Arg
null
#### Return
| 类型 |	说明 |
| ---- | ---- |
| Object | {privateKey: *, publicKey: string} |

### encrypt(msgString, publicKey, cipherMode = 0)
加密
#### Arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| msgString | 待加密字符串 | String | - | -  | 
| publicKey | 公钥 | String | - | -  | 
| cipherMode | 模式 | String | 1 - C1C3C2，0 - C1C2C3 | 0  | 
#### Return
| 类型 |	说明 |
| ---- | ---- |
| String | 加密后的字符串 |

### decrypt(encryptData, privateKey, cipherMode = 0)
解密
#### Arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| encryptData | 待解密字符串 | String | - | -  | 
| privateKey | 私钥 | String | - | -  | 
| cipherMode | 模式 | String | 1 - C1C3C2，0 - C1C2C3 | 0  | 
#### Return
| 类型 |	说明 |
| ---- | ---- |
| String | 解密后的字符串 |


## Unit Test
```
import { rkSm2 } from './rk-sm2.js';
test('md5Sha', () => {
  let keypair = rkSm2.generateKeyPairHex();
  let temp = rkSm2.encrypt('123456', keypair.publicKey);
  let result = rkSm2.decrypt(temp, keypair.privateKey);
  expect(result).toBe('123456');
});

```

