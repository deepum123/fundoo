import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
import{UserService} from "../../service/user/user.service"


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  pinnedcard: any;
  bgcolor: any = "#FFFFFF";
  type = "note";
  flag = true;
  flag1 = true;
  noteTitle = new FormControl("", [Validators.required, Validators.required]);
  noteContent = new FormControl("", [Validators.required, Validators.required]);
  model: any;
  response: any;
  isPined = false;
  reminder = [];
   labelid=[]
  todaydate = new Date();
  tomorrow = new Date(
    this.todaydate.getFullYear(),
    this.todaydate.getMonth(),
    this.todaydate.getDate() + 1,
    0,
    0,
    0,
    0
  );
  
  constructor(
    private userService: UserService,
  
  ) { }

  ngOnInit() { }

  /**********************************************************************************
   * @output : to emit the event
   *********************************************************************************/

  @Output() addingNote = new EventEmitter();
  /******************************************************************************
   * addNote() to send all the details into the server
   *****************************************************************************/
  addNote() {
    console.log(localStorage.getItem("token"), "tokennnn");
    this.flag = !this.flag;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhh",this.labelid)
    if (this.noteTitle || this.noteContent) {
      this.model = {
        
        title: this.noteTitle.value,
        description: this.noteContent.value,
            remainder: this.reminder,
          pinned: this.isPined,
          archive: this.archive,
         color: this.bgcolor,
         labelid:this.labelid,
        // trash: false,
        // remainder: "1255",
      //   pinned: true,
     
        // color: true,
         trash: false
        // image: ""
      };
      this.userService.usernote( this.model).subscribe(data => {
        console.log(data);
        this.addingNote.emit(data["message"]);
        this.noteTitle.reset();
        this.noteContent.reset();
        window.location.reload();
      }),
        err => {
          console.log(err);
        };
    }
  }

  /**********************************************************************
   *
   * @param:  to take reverse the flag
   ************************************************************************/
  reverseFlag() {
    this.flag = !this.flag;
  }
  /**********************************************************************
   *
   * @param:  to change color
   ************************************************************************/
  changeColor($event) {
    console.log("Entered parent");

    this.bgcolor = $event;
  }
  /************************************************************************
   * to reverse the flag
   *************************************************************************/
  pinned() {
    this.flag1 = !this.flag1;
  }

  dopin(set) {
    this.isPined = set;
  }
  archive($event) {
    this.archive = $event;
    this.addNote();
  }
  getReminder($event) {
    // if (this.reminder[0] != undefined) {
    //   this.reminder = [];
    //   this.reminder.push($event);
    // } else {
      this.reminder.push($event)
    }
    getlabel($event){
    this.labelid.push($event)
  }
}