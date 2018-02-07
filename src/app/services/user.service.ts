import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  result = [];
  url: string;

  constructor( private http: Http) { 
    this.url = 'http://localhost:3000';
  }

  getUsers() {
    return this.http.get(this.url + "/users")
      .map(result => this.result = result.json().data);
  }
}
