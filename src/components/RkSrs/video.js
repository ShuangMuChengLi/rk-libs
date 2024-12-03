import { systemUtil } from '../../js/tools/systemUtil';
import request from '../../js/tools/request';

export const video = {
  async startPreview(data) {
    return request({
      url: '/web/v1/video/startPreview',
      method: 'get',
      params: systemUtil.getJSONData(data),
    }).then(systemUtil.handleRequestSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async queryPlayback(data) {
    return request({
      url: '/web/v1/video/queryPlayback',
      method: 'get',
      params: systemUtil.getJSONData(data),
    }).then(systemUtil.handleRequestSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async startPlayback(data) {
    return request({
      url: '/web/v1/video/startPlayback',
      method: 'get',
      params: systemUtil.getJSONData(data),
    }).then(systemUtil.handleRequestSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async keepAlive(data) {
    return request({
      url: '/web/v1/video/keepAlive',
      method: 'get',
      params: systemUtil.getJSONData(data),
    }).then(systemUtil.handleRequestSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async requestPtzControl(data) {
    return request({
      url: '/web/v1/video/requestPtzControl',
      method: 'get',
      params: systemUtil.getJSONData(data),
    }).then(systemUtil.handleRequestSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async loadPreset(data) {
    return request({
      url: '/web/v1/video/loadPreset',
      method: 'post',
      data: systemUtil.getFormData(data),
    }).then(systemUtil.handleRequestCodeSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async updatePreset(data) {
    return request({
      url: '/web/v1/video/updatePreset',
      method: 'post',
      data: systemUtil.getFormData(data),
    }).then(systemUtil.handleRequestCodeSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async deletePreset(data) {
    return request({
      url: '/web/v1/video/deletePreset',
      method: 'post',
      data: systemUtil.getFormData(data),
    }).then(systemUtil.handleRequestCodeSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  async controlPlayback(params) {
    return request({
      url: '/web/v1/video/controlPlayback',
      method: 'get',
      params: systemUtil.getJSONData(params),
    }).then(systemUtil.handleRequestCodeSuccess).catch(res => systemUtil.handleRequestError(res, false));
  },
  // 开始录像下载
  async startVideoDownload(data) {
    return request({
      url: '/web/v1/video/startVideoDownload',
      method: 'post',
      data: systemUtil.getFormData(data)
    }).then(systemUtil.handleRequestSuccessOrigin).catch(res => systemUtil.handleRequestError(res, false));
  },
  // 获取下载进度
  async getDownloadProgress(data) {
    return request({
      url: '/web/v1/video/getDownloadProgress',
      method: 'post',
      data: systemUtil.getFormData(data),
    }).then(systemUtil.handleRequestSuccessOrigin).catch(res => systemUtil.handleRequestError(res, false));
  },
  // 停止录像下载
  async stopVideoDownload(data) {
    return request({
      url: '/web/v1/video/stopVideoDownload',
      method: 'post',
      data: systemUtil.getFormData(data)
    }).then(systemUtil.handleRequestSuccessOrigin).catch(res => systemUtil.handleRequestError(res, false));
  },
};