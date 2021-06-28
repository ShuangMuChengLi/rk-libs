import { storageUtil } from '@/js/html/storage-util/storage-util';
storageUtil.setSession('key', {name: 'Joe'});
storageUtil.getSession('key'); // {name: 'Joe'}
storageUtil.removeSession('key');
storageUtil.clearSession();
storageUtil.setLocalStorage('key', {name: 'Joe'});
storageUtil.getLocalStorage('key'); // {name: 'Joe'}
storageUtil.removeLocalStorage('key');
storageUtil.clearLocalStorage();
