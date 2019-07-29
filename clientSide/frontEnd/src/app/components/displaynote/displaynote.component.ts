import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { getLocaleFirstDayOfWeek } from "@angular/common";
import { HttpService } from "../../service/http/http.service";
import { MatCardSmImage } from "@angular/material";
//import { forEach } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UpdatenoteComponent } from "../updatenote/updatenote.component";
import { NoteServicesService } from "../../service/noteServices/note-services.service";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { MockResourceLoader } from "@angular/compiler/testing";
import { MatSnackBar } from "@angular/material";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CurrentViewService } from '../../service/currentView/current-view.service';
import {UserService} from "../../service/user/user.service";
export interface DialogData {
  labelsList: any;
  array: [];
  cardid: any;
  cond: any;
  flag: boolean;
  more: any;
  labelname: string;
}

// export interface DialogData {
//   model: any;
//   array: [];
//   cond: any;
//   flag1: true;
//   show: false;
// }

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  /********************************
   *to get input from other components
   *********************************/
  @Input() childMessage: string;
  @Input() cards;
  @Input() more: string;
  @Input() type;
  @Input() archived;
  @Input() card: [];
  @Output() color = new EventEmitter();
  @Output() emitPinnedCard = new EventEmitter();
  @Output() emitUnPinnedCard = new EventEmitter();
  @Output() dialogResult = new EventEmitter();
  @Output() emitMainNote = new EventEmitter();
  @Input() More;
  @Input() Search;
  @Input()
  @Input()
  pin;
  @Input() cond;
  pinnedValue;
  item:any[];
  notemessage:any;

  model;
  flag1 = true;
  
 
  array: any[];
  // displaymode:boolean=true

  constructor(
    public http: HttpService,
    public userService: UserService,
    public dialog: MatDialog,

    private snackBar: MatSnackBar,
    private view : CurrentViewService
  ) {
    console.log('constructor run');

  }

  ngOnChanges() {
    console.log('change run');

  }

  ngOnInit() {
    console.log("jshdgfhjsgdfjhgs");
    this.view.currentView.subscribe(
      response=>this.gridView=response
    )

  }


 
  openDialog(array) {
    var archie = array.archive;
    var delete1 = array.trash;
    console.log(delete1);

    this.pinnedValue = array.pinned;
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      width: "550px",
      // height: "130px",
      data: { array }
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(result["array"], "from dialog box");
       console.log("===========================", result["array"].trash);

      if (
        archie != result["array"].archive ||
        delete1 != result["array"].trash
      ) {
        console.log("dnfkjdnfkjdnfkjndfkjdfkj", result["array"].archive);
        let ind = this.cards.indexOf(result["array"]);
        console.log(ind);
        this.cards.splice(ind, 1);
        return;
      }
      this.emitMainNote.emit(result["array"]);
      if (this.pinnedValue != result["array"].pinned) {
        this.dialogResult.emit(result["array"]);
      }
      this.model = {
        noteid: result["array"]._id,
        newtitle: result["array"].title,
        description: result["array"].description
      };
      console.log(this.model, "modelll of update");
     this.userService.updateNoteTittle(this.model).subscribe(message => {
         console.log(message);
       });

     this.userService.updateNoteDescription(this.model).subscribe(Message => {
         console.log(Message);
       });
    });
  }

  
  notePin() {
    this.flag1 = !this.flag1;
  }


  openSnackBar() {
    this.snackBar.open("Reminder deleted", "Ok", { duration: 2000 });
  }
  openSnackBar1() {
    this.snackBar.open("Note deleted permanently", "Ok", { duration: 2000 });
  }
  openSnackBar2() {
    this.snackBar.open("Note restored", "Ok", { duration: 2000 });
  }


  /*************************************************************
   * @description: to remove label from card
   *
   * @param card : note card
   *
   * @param l : label
   *************************************************************/




  drop(event: CdkDragDrop<any[]>,item) {
    console.log("nmbxcnmvb",item);
    
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    // this.http.sequence(item).subscribe(
    //       data => {
    //         console.log(data);
    //                 // this.cardRestore(card)
    //       },
    //       err => console.log(err)
    //     );
  }
  gridView:boolean;
}