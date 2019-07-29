import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DialogData } from "../displaynote/displaynote.component"
import { UserService } from "../../service/user/user.service"

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {
  flag1 = true
  show = false;
  flag: boolean = false;

  model
 

  constructor(public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public userService :UserService ,
    private snackBar: MatSnackBar, public dialog: MatDialog) {

    // console.log(this.flag=data['flag']);
  }

  ngOnInit() {
  }

  doPin(card) {
    this.userService .doPin({
      "pinned": true,
      "noteid": [card._id]
    }).subscribe(data => {
      console.log(card.pinned = true, 'card pinned')
      console.log(data, "resp dopin")
    }, err =>
        console.log(err))

  }
doUnPin(card) {
    console.log("heee",card._id)
    this.userService .doPin({
      "pinned": false,
      "noteid": [card._id]
      
    }).subscribe(data => {
      console.log(card.pinned = false, 'do unpin card')
    }, err =>
        console.log(err))
  }
  openSnackBar() {
    this.snackBar.open("Can't edit in Trash", "Ok", { duration: 5000 })
  }
}