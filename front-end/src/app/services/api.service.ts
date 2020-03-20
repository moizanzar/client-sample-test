import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  public url: string;
  public aRequest: any[] = [];
  public baseUrl = environment.apiBase;
 
  constructor(
    public http: HttpClient,
  ) {
  }

  create(apiUrl: string): ApiService {
    this.url = this.baseUrl + 'api/' + apiUrl;
    return this;
  }

  get(param: Object): Observable<any> {
    return this.callApi('get', this.url, param);
  }

  post(param: Object): Observable<any> {
    return this.callApi('post', this.url, param);
  }

  put(param: Object): Observable<any> {
    return this.callApi('post', this.url, param);
  }

  delete(id:number): Observable<any> {

    return this.callApi('delete', `${this.url + "/" + id}`);
  }


  callApi(type: string, url: string, params: Object = {}): Observable<any> {
    let oRequest: Observable<any>;
    switch (type) {
      case 'get':
        let httpParams = new HttpParams();
        if (Object.keys(params).length != 0 && params.constructor === Object) {
          for (var i in params) {
            httpParams = httpParams.append(i, params[i]);
          }
        }
        oRequest = this.http.get(url, { 'params': httpParams });
        break;
      case 'delete':
        oRequest = this.http.delete(url);
        break;
      case 'post':
      case 'put':
        oRequest = this.http[type](url, params);
        break;
    }

    return oRequest;
  }
}
