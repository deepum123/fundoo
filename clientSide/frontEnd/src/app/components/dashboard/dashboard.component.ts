
import {
  Component,
  OnInit,
  Inject,
 
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatDialog, } from "@angular/material";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { NoteServicesService } from '../../service/noteServices/note-services.service';
import { DOCUMENT } from '@angular/common';
import { CurrentViewService } from '../../service/currentView/current-view.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;
  message: string = "Keep";
  Search: string;
  labelList: any;
  email: any;
  username: string;
  img: string;
  labelsList: any
  gridView: boolean;item: any;
  private _mobileQueryListener: () => void;

  constructor(
    @Inject(DOCUMENT) private document: any,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public dialog: MatDialog,
    private view:CurrentViewService,
    private snackBar: MatSnackBar,

  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
  }

  ngOnInit() {
   // this.getLabels()
    this.islist = true;
    this.isClicked = false;
    this.img = localStorage.getItem('profilepic');
  }
  islist;
  isClicked;
  changeview() {
    
    if (this.islist) {
      this.islist = false;
      console.log("list", this.islist);
      this.isClicked = true;
    }

    else {

      this.isClicked = false;
      console.log("grid", this.isClicked);
      this.islist = true;
    }
    //this.notes.gridview();
    this.view.viewChange()

  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

 

  refresh(): void {
    window.location.reload();
  }
  note() {
    this.message = "Keep"
    this.router.navigate(['dashboard/cardnotes']);
  }
  reminders() {

    this.message = "Reminders"
    this.router.navigate(['dashboard/reminders'])
  }
  signout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  archive() {
    this.message = "Archive"
    this.router.navigate(['dashboard/archive']);
  }
  trashBox() {
    this.message = "Trash"
    this.router.navigate(['dashboard/trash']);
  }
  startSearch() {
    this.router.navigate(['dashboard/search']);
  }
  editlabes() {
    this.router.navigate(['dashboard/labels'])
  }
 

  sidenav() {
    console.log('i am run');

  }
 

  openSnackBar() {
    this.snackBar.open('Signed out successfully', 'Ok', { duration: 2000 })
  }
  goToUrl(): void {
    this.document.location.href = 'https://www.google.com';
  }
  goToUrl1(): void {
    this.document.location.href = 'https://www.google.com/intl/en-GB/drive';
  }
  goToUrl2(): void {
    this.document.location.href = 'https://www.google.com/maps';
  }
  goToUrl3(): void {
    this.document.location.href = 'https://www.youtube.com';
  }
  goToUrl4(): void {
    this.document.location.href = 'https://www.google.com/intl/en-GB/gmail/about';
  }
 
}