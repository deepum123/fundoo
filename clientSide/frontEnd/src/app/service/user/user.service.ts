import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }
  userRegistration(requestBody) {
    const option = {
      url: 'register',
      body: requestBody
    };
    return this.httpService.postWithoutToken(option);
  }

  userLogin(requestBody) {
    const option = {
      url: 'login',
      body: requestBody
    };
    return this.httpService.postWithoutToken(option);
  }

  emailVerification(requestBody) {
    //const aw = localStorage.getItem('verifyemail')
    const tkn = requestBody.token
    const option = {
      url: 'verification/'+tkn,
      body: tkn
    };
    return this.httpService.emailVerification(option);
  }

  userForgot(requestBody) {
    const option = {
      url: 'forgotpassword',
      body: requestBody
    };
    return this.httpService.postWithoutToken(option);
  }

  resetPassword(requestBody) {
    const tkn = requestBody.token
    console.log("userReset",tkn)
    console.log("requestBody",requestBody.password)
    const option = {
      url: 'resetpassword/'+tkn,
      body: requestBody
    };
    return this.httpService.resetPassword(option);
  }
  usernote(requestBody) {
    const option = {
      url: 'createNote',
      body: requestBody
    };
    return this.httpService.postWithTokenNotes(option);
  }
  getnotee() {
    const option = {
      url: 'getAllNotes',
      
    };
    return this.httpService.getCards(option);
  }
  doPin(requestBody) {
    const option = {
      url: 'isPinned',
      body: requestBody
    };
    return this.httpService.doPin(option);
  }
  updateNoteTittle(requestBody) {
    const option = {
      url: 'editTitle',
      body: requestBody
    };
    return this.httpService.updateNoteTittle(option);
  }
  updateNoteDescription(requestBody) {
    const option = {
      url: 'editDescription',
      body: requestBody
    };
    return this.httpService. updateNoteTittle(option);
  }
 
}
