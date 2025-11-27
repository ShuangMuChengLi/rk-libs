/**
 * 本地存储工具类，提供 sessionStorage 和 localStorage 的操作方法
 */
export const storageUtil = {
  /**
   * 根据键值获取 sessionStorage
   * @param key 键（字符串类型）
   * @returns 成功返回解析后的值，失败返回 false
   */
  getSession(key: string): any | false {
    if (typeof Storage !== 'undefined' || typeof key !== 'string') {
      const value = sessionStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : value;
      } catch (e) {
        return value;
      }
    } else {
      return false;
    }
  },

  /**
   * 设置 sessionStorage
   * @param key 键（字符串类型）
   * @param value 值（支持字符串、JSON、数组等类型）
   * @returns 操作成功返回 true，失败返回 false
   */
  setSession(key: string, value: any): boolean {
    if (typeof Storage !== 'undefined' || typeof key !== 'string') {
      const storageValue = typeof value !== 'string' ? JSON.stringify(value) : value;
      sessionStorage.setItem(key, storageValue);
      return true;
    } else {
      return false;
    }
  },

  /**
   * 移除指定键的 sessionStorage
   * @param key 键（字符串类型）
   * @returns 操作成功返回 true，失败返回 false
   */
  removeSession(key: string): boolean {
    if (typeof Storage !== 'undefined' || typeof key !== 'string') {
      sessionStorage.removeItem(key);
      return true;
    } else {
      return false;
    }
  },

  /**
   * 清空所有 sessionStorage
   * @returns 操作成功返回 true，失败返回 false
   */
  clearSession(): boolean {
    if (typeof Storage !== 'undefined') {
      sessionStorage.clear();
      return true;
    } else {
      return false;
    }
  },

  /**
   * 根据键值获取 localStorage
   * @param key 键（字符串类型）
   * @returns 成功返回解析后的值，失败返回 false
   */
  getLocalStorage(key: string): any | false {
    if (typeof Storage !== 'undefined' || typeof key !== 'string') {
      const value = localStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : value;
      } catch (e) {
        return value;
      }
    } else {
      return false;
    }
  },

  /**
   * 设置 localStorage
   * @param key 键（字符串类型）
   * @param value 值（支持字符串、JSON、数组等类型）
   * @returns 操作成功返回 true，失败返回 false
   */
  setLocalStorage(key: string, value: any): boolean {
    if (typeof Storage !== 'undefined' || typeof key !== 'string') {
      const storageValue = typeof value !== 'string' ? JSON.stringify(value) : value;
      localStorage.setItem(key, storageValue);
      return true;
    } else {
      return false;
    }
  },

  /**
   * 移除指定键的 localStorage
   * @param key 键（字符串类型）
   * @returns 操作成功返回 true，失败返回 false
   */
  removeLocalStorage(key: string): boolean {
    if (typeof Storage !== 'undefined' || typeof key !== 'string') {
      localStorage.removeItem(key);
      return true;
    } else {
      return false;
    }
  },

  /**
   * 清空所有 localStorage
   * @returns 操作成功返回 true，失败返回 false
   */
  clearLocalStorage(): boolean {
    if (typeof Storage !== 'undefined') {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }
};
