import { storageUtil } from '../../js/tools/storageUtil';

function _findOrigin(serverlist = [], pools = {}) {
  if (!serverlist.length) return '';

  const tartet = serverlist.find(t => {
    if (!pools[t] || pools[t] < 6) return true;
    return false;
  });
  return tartet || '';
}

export const VideoPool = {
  /**
   *
   * @param {*} url 完整的url
   * @param {*} serverlist 额外代理地址
   */
  addOrigin(url = '', serverlist = []) {
    const originReg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
    const origin = url.match(originReg)[0];
    const pools = storageUtil.getSession('videoPool') || {};
    let resUrl = url;
    if (!serverlist.length) return resUrl;

    if (!pools[origin]) {
      pools[origin] = 1;
    } else if (pools[origin] < 6) {
      pools[origin]++;
    } else {
      // 从serverlist中查找
      const proxyOrigin = _findOrigin(serverlist, pools);
      if (proxyOrigin) {
        if (pools[proxyOrigin]) {
          pools[proxyOrigin]++;
        } else {
          pools[proxyOrigin] = 1;
        }
        resUrl = url.replace(originReg, proxyOrigin);
      } else {
        resUrl = '';
      }
    }
    storageUtil.setSession('videoPool', pools);
    console.log(resUrl);
    return resUrl;
  },
  removeOrigin(url = '') {
    const originReg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
    const origin = url.match(originReg)[0];
    const pools = storageUtil.getSession('videoPool') || {};
    pools[origin] && pools[origin]--;
    storageUtil.setSession('videoPool', pools);
  },
  clearOrigins() {
    storageUtil.removeSession('videoPool');
  }
};
