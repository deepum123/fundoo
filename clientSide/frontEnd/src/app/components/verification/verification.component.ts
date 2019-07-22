import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.minLength(8)]);
  constructor(private userservice : UserService,private route : Router,private router: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.router);
    console.log(this.router.snapshot.params.token);
  }
  confirm(){  
    // console.log("confirm clicked",this.route.url);
    // var emailv=this.route.url;
    const token = this.router.snapshot.params.token; 
     
    
     const requestBody = {
      token: token
    }
    console.log("email inside body = ",requestBody);
    
     this.userservice.emailVerification(requestBody).subscribe(data => {
      console.log(data);
      this.route.navigate(['login']);
      }), error => {
        console.log(error);
        console.log('err',error);
      };
    
  }
}