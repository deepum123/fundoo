import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteServicesService {

  constructor(private http: HttpClient) { }
  result: boolean = true;
  subject = new Subject();

  
  doPin(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.put('isPinned', data,httpOptions)
  } 
  getView() {
    this.gridview();
    return this.subject.asObservable();
  }
  gridview() {
    console.log('grid view result ', this.result);

    if (this.result) {
      this.subject.next({ data: "row" });
      this.result = false;
    }
    else {
      this.subject.next({ data: "column" });
      this.result = true;
    }
  }
}
