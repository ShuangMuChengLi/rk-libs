// 使用混入的方式获取数据字典并将数据字典缓存到vuex中去
import { mapState } from 'vuex';
/**
 * 根据字典的key获取字典名称的工具函数
 * @param {Array} dictList 字典的列表
 * @param {String} value 字典列表的某一条字典值
 * @param {String} keyName 字典key的键名
 * @param {String} valueName 字典值得键名
 * @returns
 */
export function selectDictLabel(dictList, value, keyName = 'label', valueName = 'value') {
  const item = dictList && dictList.find(item => item[valueName] === String(value));
  if(!item) return '';

  return item[keyName];
}
export default {
  install(Vue) {
    Vue.prototype['$selectDictLabel'] = selectDictLabel;
    Vue.mixin({
      computed: {
        ...mapState('dictionary', ['dicts'])
      },
      created() {
        if(this.$options.dicts instanceof Array && this.$options.dicts.length > 0) {
          for(let i = 0; i < this.$options.dicts.length; i++) {
            try {
              this.$store.dispatch('dictionary/getDictionary', this.$options.dicts[i]);
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    });
  }
};