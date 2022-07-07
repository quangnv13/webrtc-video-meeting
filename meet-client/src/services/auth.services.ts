import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { IDataResponse } from '../types/base/baseResponse';
import { CURRENT_ACCOUNT_STORAGE_KEY } from '../utils/constants';
import { storage } from '../utils/storageHelpers';
import httpService from './api.services';
export interface IAccount {
  token: string;
  email: string;
}
class AuthService {
  private currentAccountSubject = new BehaviorSubject<IAccount | undefined>(undefined);
  currentAccount$ = this.currentAccountSubject.asObservable();
  constructor() {
    this.currentAccountSubject.next(storage.get(CURRENT_ACCOUNT_STORAGE_KEY));
  }

  setCurrentAccount = (data: IAccount) => {
    if (data.token) {
      const jwtPayload = jwtDecode<{
        id: number;
        email?: string;
        exp: number;
        sub: string;
      }>(data.token);
      const accountData = {
        ...data,
        accountId: jwtPayload.id,
        email: data.email || jwtPayload?.email || ''
      };
      storage.set(CURRENT_ACCOUNT_STORAGE_KEY, accountData);
      this.currentAccountSubject.next(accountData);
    } else {
      storage.set(CURRENT_ACCOUNT_STORAGE_KEY, data);
    }
  };

  getCurrentAccount = () => {
    return this.currentAccountSubject.value;
  };

  isLogged = () => {
    return !!this.currentAccountSubject.value?.token;
  };

  login(username: string, password: string): Promise<IDataResponse<IAccount>> {
    return httpService.post<IAccount>('api/auth/login', { username, password });
  }
}
export default new AuthService();
