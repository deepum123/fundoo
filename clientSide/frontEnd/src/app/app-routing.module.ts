import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component'
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerificationComponent } from './components/verification/verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthguardService } from './service/authguard/authguard.service';
import { NoteComponent } from './components/note/note.component';
import { CardnoteComponent } from './components/cardnote/cardnote.component';
import { DisplaynoteComponent } from './components/displaynote/displaynote.component';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { LabeliditComponent } from './components/labelidit/labelidit.component';
import { SearchComponent } from './components/search/search.component';
import { ImagecorpComponent } from './components/imagecorp/imagecorp.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { TrashComponent } from './components/trash/trash.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'u',
    component: UpdatenoteComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  
  {
    path:'note',
    component:NoteComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetpasswordComponent
  },
  {
    path: 'verification/:token',
    component: VerificationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
  {
    path : 'cardnotes',
    component:CardnoteComponent
  },
  {
    path : 'labeledit',
    component:LabeliditComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,canActivate:[AuthguardService],
    children:[
      {
        path:'',
        redirectTo : 'cardnotes',
        pathMatch : 'full'
      },
      {
            path : 'cardnotes',
            component:CardnoteComponent
          },
          {
            path: 'search',
            component: SearchComponent
          },
          {
            path: 'archive',
            component:   ArchiveComponent 
          },
          {
            path: 'trash',
            component:  TrashComponent 
          },
          {
            path: 'reminders',
            component:   RemindersComponent 
          },
        
    ]
  },
  {
    path: 'imagecropper',
    component: ImagecorpComponent
  },
    
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
