import { API_URL } from './app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class UserService {

  constructor(private _http: HttpClient) {}

  public createUser(user) {
    return this._http.post(API_URL + 'user', user);
  }

  public updateUser(user) {
    return this._http.put(API_URL + 'user', user);
  }
}
