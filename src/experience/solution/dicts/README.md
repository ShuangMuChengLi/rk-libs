# 数据字典
## 数据字典集成
1. main.js
```
import DictMixin from '@/js/dictmixins'; // 使用混入的方式获取数据字典并将数据字典缓存到vuex中去
Vue.use(DictMixin);
```
## 数据字典调用
> 获取字典值列表示例

**(1)直接获取【不缓存到vuex中】**
```js
const data = await this.$getDictOptions(['resourceType', 'gender']);
this.menuTyps = data[0];
this.genderDict = data[1]
```
**(2)缓存到vuex中**
```js
// 示例
this.$store.dispatch('dictionary/getDictionary', 'resourceType').then(res => {
  console.log(res);
})
// 获取
await this.$store.dispatch('dictionary/getDictionary', 'resourceType')
```
**(3)封装el-select数据字典下拉框**
> 使用方法
> 所传属性和方法与el-select基本一致
```html
<dict-select v-model="form.keyword" dictType='political' />
```
**(4)vue使用全局混入的方式实现数据字典的快速获取，并用vuex缓存**
> 1、在vue中使用如下
```js
{
  data() {
    return {}
  },
  dicts: ['noticeStatus', 'examAuditStatus'],
  methods: {}
}

```
> 2、使用数据
`this.dicts.noticeStatus`来使用

***
> 根据字典值获取字典的中文名称
```js
this.$selectDictLabel(genderDict, '0') // '男'
```