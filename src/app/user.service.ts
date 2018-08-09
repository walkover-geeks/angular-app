import { API_URL } from './app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class UserService {

  constructor(private _http: HttpClient) {}

  public getAllUsers() {
    return this._http.get(API_URL + 'users');
  }

  public createUser(user) {
    return this._http.post(API_URL + 'users', user);
  }

  public updateUser(user) {
    return this._http.put(API_URL + 'users', user);
  }

  public deleteUser(user_id: number) {
    return this._http.delete(API_URL + 'users/' + user_id);
  }
}
