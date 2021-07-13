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
  }
};
