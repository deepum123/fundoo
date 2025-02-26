import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../service/user/user.service';
import { MatSnackBar } from '@angular/material';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmpassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  constructor(private userService: UserService, private route: ActivatedRoute,private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.route);
    console.log(this.route.snapshot.params.token);
  }
  reset() {
    console.log(this.password.value);
    const token = this.route.snapshot.params.token;
   
   
    if (this.password.value == this.confirmpassword.value) {
      const requestBody = {
        password: this.password.value,
        token:token
      };
      console.log(requestBody);
      this.userService.resetPassword(requestBody).subscribe(data => {
        console.log(data);
        this.snackBar.open("Password Updated", "ok", { duration: 5000 });
        this.router.navigate(['login']);
      },
        error => {
          console.log(error);
          this.snackBar.open("Interupts occurs on update the password", "ok", { duration: 5000 });
        });
    } else {
      console.log('password and confirmpassword not matched');
      this.snackBar.open("Interupts occurs on  password matching ", "ok", { duration: 5000 })
    }
  }
  matcher = new MyErrorStateMatcher(); 
}