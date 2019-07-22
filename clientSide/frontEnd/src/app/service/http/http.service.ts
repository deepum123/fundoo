import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient,
  ) {   }
  apiBaseurl = environment.baseUrl

  postWithoutToken(options) {
    //const verify=localStorage.getItem('verifyemail')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.baseUrl + options.url, options.body, httpOptions);
  }
 
  emailVerification(options) {
    console.log("url",options.url)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('resetPassword')
      })
    };
    return this.http.get(environment.baseUrl + options.url, options.body);
  }
 
  resetPassword(options) {
    console.log("verifytoken reset",options.body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.post(environment.baseUrl + options.url, options.body, httpOptions);
    
  }
  verifyWithToken(options) {
    console.log("verifytoken reset",options.body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.post(environment.baseUrl + options.url, options.body, httpOptions);
    
  }

}
