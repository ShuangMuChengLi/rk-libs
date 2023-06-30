# 项目工具包systemUtil
## download
[库文件下载](./js/tools/systemUtil.zip)
## Methods
### systemUtil.validateForm(formRef) 
elementUI的form表单验证方法，将官方的回调方法改为Promise方法
#### args
| 参数 |	说明 |类型 |是否必填 | 可选值	| 默认值 | 
| ---- | ---- |---- | ----   |----  | ---- |
| formRef | elementUI的form表单ref | Vue Ref | true | - | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| Promise | 如果验证成功，resolve true。反之false |
#### usage
```javascript
async function fn(){
    let result = await systemUtil.validateForm(this.$refs.form);
}
```

### systemUtil.toThousands(x)
数字三位分节法，即数字每三位逗号隔开
#### args
| 参数 |	说明 |类型 |是否必填 |可选值	| 默认值 | 
| ---- | ---- |---- | ----   |----  | ---- |
| num | 待处理数字 | Number | true | - | -  | 
#### return
| 类型 |	说明 |
| ---- | ---- |
| String | 三位分节法处理后的字符串 |
#### usage
```javascript
let result = systemUtil.toThousands(123456789);
// 123,456,789
```

### blobToBase64(blob)
blob转为base64

### fileToBase64(file)
File转为base64

### base64ToBlob(data, mime)
base64转为blob

### blobToFile(bits, name, options)
blob转为File
