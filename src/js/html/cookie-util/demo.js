import { getCookie, removeCookie, setCookie} from '@/js/html/cookie-util/cookie-util';
setCookie('name', 'Joe');
getCookie('name'); // 'Joe'
removeCookie('name');
