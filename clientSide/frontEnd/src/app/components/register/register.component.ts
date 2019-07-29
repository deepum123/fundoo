import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../service/user/user.service";
import { MatSnackBar } from "@angular/material";
import { ErrorStateMatcher } from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {  
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private route: Router,
    private userservice: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    // this.register();
  }

  model = {};
  hide = true;
  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'),Validators.minLength(3), Validators.maxLength(15)]);
  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'),Validators.minLength(3), Validators.maxLength(10)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmpassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
 
  

  register() {
    if (this.password.value == this.confirmpassword.value) {
    var reqbody = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value
      
    };
    console.log(reqbody);
    this.userservice.userRegistration(reqbody).subscribe(
     ( data:any) => {
        console.log(data);
        //snackbar to show messages.
        localStorage.setItem("token", data.token);
        this.snackBar.open("Registered successfully Check Your Mail and verify your email id", "ok", {
          duration: 5000
        });
        
      },
      err => {
        console.log("err", err);
        this.snackBar.open("Register failed!!", "ok", { duration: 5000 });
      }
    );}else {
      console.log('password and confirmpassword not matched'); 
      this.snackBar.open("Password does not match", "ok", { duration: 5000 });
    }
  }

  matcher = new MyErrorStateMatcher();
  login() {
    this.route.navigate(['login'])
  }
}