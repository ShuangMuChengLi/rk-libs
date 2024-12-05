
import Vue from 'vue';
import { sysDictionary } from './sysDictionary';
async function getDictOptions(list) {
  const promiseList = [];
  for (let obj in list) {
    const p = new Promise(async (resolve, reject) => {
      let result = await sysDictionary.showDataByType({dataType: list[obj]});
       
      if(!result){
        return reject([]);
      }

      let data = result.map((item) => {
        return {
          label: item.dataValue,
          value: item.dataCode,
        };
      });
      resolve(data);
    });
    promiseList.push(p);
  }
  return Promise.all(promiseList);
}
const dictionary = {
  namespaced: true,
  state: {
    dicts: {} // 数据字典映映射键值对
  },
  mutations: {
    // 通用的提交数据字典数据
    SET_COMMON_DICT: (state, payload) => {
      const { key, value } = payload;
      try {
        // state.dicts[key] = value
        Vue.set(state.dicts, key, value);
      } catch (error) {
        console.error(error);
      }
    }
  },
  actions: {
    /**
     * 获取数据字典并且将字典值缓存，如果有值，直接获取值，如果没有值，请求接口
     * @param {String} type 数据字典的类型
     */
    getDictionary({ commit, state }, type) {
      return new Promise(async (resolve, reject) => {
        const dicts = state.dicts;

        if(!dicts[type] || (dicts[type] && dicts[type].length === 0)) {
          try {
            const data = await getDictOptions([type]);
            commit('SET_COMMON_DICT', { key: type, value: data[0] });
            resolve(data[0]);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(dicts[type]);
        }
      });
    }
  }
};

export default dictionary;