# 3des加解密
实现对数据的3des加解密
## download
[库文件下载](./js/math/rk-3des.zip)   

## dependence
crypto-js   
如果秘钥较短，会报错。可以替换为依赖rk-3des.zip中的本地crypto-js.js
## Functions
### encrypt3Des(string, key)
#### arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| string | 待加密字符串 | String | - | -  | 
| key | 秘钥 | String | - | - | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| String | 加密后的字符串 |

### decrypt3Des(encryptedSting, key)
#### arg
| 参数 |	说明 |类型 |可选值	| 默认值 |
| ---- | ---- |---- | ----   |----  | 
| encryptedSting | 加密的字符串 | String | - | -  | 
| key | 秘钥 | String | - | - | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| String | 解密后的字符串 |


## Unit Test
```
import { encrypt3Des, decrypt3Des } from './rk-3des';
test('rk-3des', () => {
  const key = '4c43c365a4ac05b91eb5fa95';
  const string = 'hello world';
  let temp = encrypt3Des(string, key);
  expect(temp).toBe('imEXXd89kx6/7e1dbAmy9Q==');
  let result = decrypt3Des(temp, key);
  expect(result).toBe('hello world');
});

```

