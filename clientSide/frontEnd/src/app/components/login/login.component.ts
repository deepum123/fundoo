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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private userservice: UserService,
    private route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  model = {};
  hide = true;
  login() {
    try {
      if (this.emailFormControl.value == "" || this.password.value == "")
        throw "fields cannot be empty";

      var reqbody = {
        email: this.emailFormControl.value,
        password: this.password.value
      };
      console.log(reqbody);

      this.userservice.userLogin(reqbody).subscribe(
        (data: any) => {


          localStorage.setItem("userid", data.data[0]._id);
          localStorage.setItem("email", data.data[0].email);
          localStorage.setItem("fisrtname", data.data[0].firstname);
          localStorage.setItem("lastname", data.data[0].lastname);
          localStorage.setItem('token', data.token)
          //snackbar to show messages.
          this._snackBar.open("Logged In Successfully", "OK", {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });

          this.route.navigate(['dashboard']);
          console.log("hiiiiiiiiiiiiiii");
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
  registerPath() {
    this.route.navigate(['register'])
  }
  forgotpassword() {
    this.route.navigate(['forgotpassword'])
  }
}