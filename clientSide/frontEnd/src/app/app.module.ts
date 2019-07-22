import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';
 import {MatSnackBarModule} from '@angular/material/snack-bar';
import { VerificationComponent } from './components/verification/verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatCheckboxModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent ,
    ResetpasswordComponent,
    VerificationComponent,
    DashboardComponent,
  
  
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatInputModule,
     MatButtonModule, 
    MatSelectModule, 
    MatIconModule,
    BrowserAnimationsModule ,
    MatCardModule,
    HttpClientModule ,
    HttpModule ,
    MatSnackBarModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
