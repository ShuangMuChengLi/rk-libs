export const rkUrl = {
  /**
   * 添加searchParams
   * @param url String
   * @param searchParamsSet Object searchParams键值对
   * @return {string}
   */
  addParameter (url, searchParamsSet) {
    const parseUrl = new URL(url);
    for (const key in searchParamsSet) {
      if (!Object.hasOwnProperty.call(searchParamsSet, key)) continue;
      parseUrl.searchParams.set(key, searchParamsSet[key]);
    }
    return parseUrl.href;
  },
  parameterToJson(paramsString){
    var searchParams = new URLSearchParams(paramsString);

    let o = {};
    for(let key of searchParams.keys()){
      o[key] = searchParams.getAll(key);
      if(o[key].length === 1){
        o[key] = o[key][0];
      }
    }
    return o;
  },
  jsonToParameter(json){
    var searchParams = new URLSearchParams();

    for(let key in json){
      searchParams.set(key, json[key]);
    }
    return searchParams.toString();
  }
};
