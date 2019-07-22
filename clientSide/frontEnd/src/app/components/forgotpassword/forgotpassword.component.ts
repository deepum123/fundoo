import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user/user.service';

import { FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userservice: UserService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    //  email: this.email.value
  }
  forgot() {
    console.log("Inside forgot password", this.email.value)
    try {
      const requestBody = {
        email: this.email.value
      };

      this.userservice.userForgot(requestBody).subscribe(
        (data: any) => {

          console.log(data)
          localStorage.setItem("userid", data.data[0]._id);
          localStorage.setItem("email", data.data[0].email);
          localStorage.setItem("fisrtname", data.data[0].firstname);
          localStorage.setItem("lastname", data.data[0].lastname);
          localStorage.setItem('token', data.token)
          //snackbar to show messages.
          this._snackBar.open("reset password link is sent to your email please check it", "OK", {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });

        },
        err => {
          console.log("err", err);
          this._snackBar.open("Enter correct Email and Password!!", "OK", { duration: 5000 });
        });

    } catch {
      console.log("error")
      this._snackBar.open("Email or Password can not be empty!", "", {
        duration: 5000,
        panelClass: ['blue-snackbar']
      });
    };

  }
  matcher = new MyErrorStateMatcher(); 

}