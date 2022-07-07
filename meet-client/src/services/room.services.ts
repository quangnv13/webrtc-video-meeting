import { IDataResponse } from '../types/base/baseResponse';
import httpService from './api.services';
export interface IRoom {
  username: string;
  fullname: string;
  meetName: string;
  createdAt: string;
  path: string;
}
export default {
  createRoom(payload: { name: string; password: string }): Promise<IDataResponse<IRoom>> {
    return httpService.post<IRoom>('api/meet', payload, false);
  },
  getListRoom(): Promise<IDataResponse<IRoom[]>> {
    return httpService.get<IRoom[]>('api/meet/get-all');
  }
};
