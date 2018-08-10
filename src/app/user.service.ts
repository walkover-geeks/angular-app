import { API_URL } from './app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class UserService {

  constructor(private _http: HttpClient) {}

  public getAllUsers(mobile: string) {
    return this._http.get(API_URL + 'users?mobile=' + mobile);
  }

  public createUser(mobile, user) {
    return this._http.post(API_URL + 'users?mobile=' + mobile, user);
  }

  public updateUser(mobile, user) {
    return this._http.put(API_URL + 'users/' + user.id + '?mobile=' + mobile, user);
  }

  public deleteUser(mobile, user_id: number) {
    return this._http.delete(API_URL + 'users/' + user_id + '?mobile=' + mobile);
  }
}
