import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import{HttpService}from "../http/http.service"
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteServicesService {

  constructor(private http: HttpService) { }
  result: boolean = true;
  subject = new Subject();

  
  // doPin(data) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'token': localStorage.getItem('token')
  //     })
  //   };
  //   return this.http.put('isPinned', data,httpOptions)
  // } 
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


  archiveNote(data) {
    const option = {
      url: 'isPinned',
      body: data
    };
    return this.http.put( option)
  }
  trashNote(data) {
    const option = {
      url: 'isTrashed',
      body: data
    };
    return this.http.put( option)
  }
  updateColor(data) {
    const option = {
      url: 'updateColor',
      body: data
    };
    return this.http.put( option )
  }
  addRemainder(data) {
    const option = {
      url: 'remainder',
      body: data
    };
    return this.http.put( option )
  }
  removeRemainder(data) {
    const option = {
      url: 'Removeremainder',
      body: data
    };
    return this.http.put( option )
  }
  getLableList(){

    const option = {
      url: 'getlabels'
     
    };
    return this.http.post( option )
  }
  postLabel(data) {
    const option = {
      url: 'createlabel',
      body: data
    };
    return this.http.post( option )
  }
  deleteLabel(data) {
    const option = {
      url: 'deletelabel',
      body: data
    };
    return this.http.post( option )
  }
  updateLabel(data) {
    const option = {
      url: 'editlabelname',
      body: data
    };
    return this.http.post( option )
  } 
  saveLabelToNote(data) {
    const option = {
      url: ' saveLabelToNote',
      body: data
    };
    return this.http.post( option )
  }
  removeLabel(data) {
    const option = {
      url: 'RemoveLabelFromNote',
      body: data
    };
    return this.http.post( option )
  }
  deleteForever(data) {
    const option = {
      url: ' deleteNote',
      body: data
    };
    return this.http.post( option )
  }
  search(data) {
    const option = {
      url: 'search',
      body: data
    };
    return this.http.post( option )
  }
}
