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
    if (this.noteTitle || this.noteContent) {
      this.model = {
        
        title: this.noteTitle.value,
        description: this.noteContent.value,
        // reminder: this.reminder,
         pinned: this.isPined,
        // archive: this.archive,
        // color: this.bgcolor,
        // trash: false,
         reminder: "1255",
      //   pinned: true,
        archive: false,
         color: true,
         trash: false
        // image: ""
      };
      this.userService.usernote( this.model).subscribe(data => {
        console.log(data);
        this.addingNote.emit(data["message"]);
        this.noteTitle.reset();
        this.noteContent.reset();
      
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
 
  /************************************************************************
   * to reverse the flag
   *************************************************************************/
  pinned() {
    this.flag1 = !this.flag1;
  }

  dopin(set) {
    this.isPined = set;
  }
 
 
}