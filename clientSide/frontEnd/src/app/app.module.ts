import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';

import { ReminderComponent } from './components/reminder/reminder.component';
import { NoteComponent } from './components/note/note.component';
import { SearchComponent } from './components/search/search.component';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { DisplaynoteComponent } from './components/displaynote/displaynote.component';
import { IconlistComponent } from './components/iconlist/iconlist.component';
import { LabeliditComponent } from './components/labelidit/labelidit.component';
import { ImagecorpComponent } from './components/imagecorp/imagecorp.component';
import {MatChipsModule} from '@angular/material/chips';

import { MatDialogModule } from '@angular/material/dialog';
import { TakenoteComponent } from './components/takenote/takenote.component';
import { CardnoteComponent } from './components/cardnote/cardnote.component';
import { EditCardComponrntComponent } from './components/edit-card-componrnt/edit-card-componrnt.component';
import { EditCardComponentComponent } from './components/edit-card-component/edit-card-component.component';

import { LabelPipe } from './service/pipe/labelpipe/label.pipe';
import { SearchPipe } from './service/pipe/searchpipe/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent ,
    ResetpasswordComponent,
    VerificationComponent,
    DashboardComponent,
    
    ReminderComponent,
    NoteComponent,
    SearchComponent,
    UpdatenoteComponent,
    TrashComponent,
    RemindersComponent,
    ArchiveComponent,
    DisplaynoteComponent,
    IconlistComponent,
    LabeliditComponent,
    ImagecorpComponent,
    TakenoteComponent,
    CardnoteComponent,
    EditCardComponrntComponent,
    EditCardComponentComponent,
    
    LabelPipe,
    SearchPipe,
  
  
  ],
  imports: [
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
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
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
