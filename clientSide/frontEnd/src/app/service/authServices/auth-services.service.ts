import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor() { }
  public isAuthenticated(): boolean {
    const token = 'cghjcgh'//localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}