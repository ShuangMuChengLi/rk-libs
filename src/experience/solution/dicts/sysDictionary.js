import { systemUtil } from '../../../js/tools/system-util/system-util.js';
import request from '../../../js/tools/request/request';


export const sysDictionary = {
  showDataByType(data) {
    return request({
      url: '/web/sysDictionary/showDataByType',
      method: 'post',
      data: systemUtil.getFormData(data),
      ...systemUtil.getFormHeader()
    }).then(systemUtil.handleRequestSuccess).catch(res=>systemUtil.handleRequestError(res, false));
  },
};