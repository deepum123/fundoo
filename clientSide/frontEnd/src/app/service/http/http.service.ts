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
      })
    };
    return this.http.get(environment.baseUrl + options.url, options.body);
  }
 
  resetPassword(options) {
    console.log("verifytoken reset",options.body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(environment.baseUrl + options.url, options.body, httpOptions);
    
  }
  verifyWithToken(options) {
    console.log("verifytoken reset",options.body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(environment.baseUrl + options.url, options.body, httpOptions);
    
  }
  postWithTokenNotes(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.post(environment.baseUrl + options.url, options.body, httpOptions);
  }
  getCards(option) {
    const httpToken = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
    return this.http.get(environment.baseUrl + option.url, httpToken);
  }
  doPin(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.put(environment.baseUrl + data.url, data.body, httpOptions);
  } 
  updateNoteTittle(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.put(environment.baseUrl + data.url, data.body, httpOptions);
  }
  put(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    
    return this.http.put(environment.baseUrl + data.url, data.body, httpOptions);
  }
   post(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };

    return this.http.post(environment.baseUrl + data.url, data.body,httpOptions);
  }
}
