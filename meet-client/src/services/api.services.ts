import { IDataResponse } from '../types/base/baseResponse';
import axios, { AxiosRequestHeaders } from 'axios';
import { storage } from '../utils/storageHelpers';
import Config from '../config/configURL';
import { CURRENT_ACCOUNT_STORAGE_KEY } from '../utils/constants';
import { IAccount } from './auth.services';
export default {
  _getHeaders() {
    const headers: AxiosRequestHeaders = {};
    if (!storage.get(CURRENT_ACCOUNT_STORAGE_KEY)) return headers;
    const currentUser: IAccount = storage.get(CURRENT_ACCOUNT_STORAGE_KEY);
    headers.Authorization = 'Bearer ' + currentUser.token;
    return headers;
  },
  async get<T>(url: string): Promise<IDataResponse<T>> {
    const headers = this._getHeaders();
    const { data } = await axios.get<IDataResponse<T>>(Config.API_URL + url, { headers });
    return data;
  },
  async post<T>(url: string, payload: any, isUpload = false): Promise<IDataResponse<T>> {
    const headers = this._getHeaders();
    if (isUpload) {
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }
      payload = formData;
    }
    const { data } = await axios.post<IDataResponse<T>>(Config.API_URL + url, payload, { headers });
    return data;
  },
  async delete<T>(url: string): Promise<IDataResponse<T>> {
    const headers = this._getHeaders();
    const { data } = await axios.delete<IDataResponse<T>>(Config.API_URL + url, { headers });
    return data;
  },
  async put<T>(url: string, payload: any, isUpload = false): Promise<IDataResponse<T>> {
    const headers = this._getHeaders();
    if (isUpload) {
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }
      payload = formData;
    }
    const { data } = await axios.put<IDataResponse<T>>(Config.API_URL + url, payload, { headers });
    return data;
  }
};
