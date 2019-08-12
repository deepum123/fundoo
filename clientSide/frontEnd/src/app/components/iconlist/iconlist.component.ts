import { Component, OnInit, Output, Input } from "@angular/core";
import { NoteServicesService } from "../../service/noteServices/note-services.service";
import { EventEmitter } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material";
import { LabeliditComponent } from "../../components/labelidit/labelidit.component";
import { from } from "rxjs";
import { HttpService } from 'src/app/service/http/http.service';
//import { CollaboratorsComponent } from "../collaborators/collaborators.component";

@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.scss']
})
export class IconlistComponent implements OnInit {
  @Input() card: any;
  @Input() more;
  @Output() color = new EventEmitter();
  @Input() type;
  @Input() doarchive: boolean;
  @Output() deletecard = new EventEmitter();
  @Output() archivedCard = new EventEmitter();
  @Output() unarchiveCard = new EventEmitter();
  @Output() emitReminderNote = new EventEmitter();
  @Output() archivedNoteCard = new EventEmitter();
  @Output() emitLabelToNote = new EventEmitter();
  @Output() emitlabelid = new EventEmitter();
  model: any;
  flag = false;
  flag2 = true;
  flag1 = true;
  flag3 = true;
  flag4 = true;
  display = false;
  allcards: any;
  labelsList: any;
  label: string;

  /***************************************************************
   * List of colors that can be applied to card taken in an array
   **************************************************************/
  colorArray = [
    [
      { color: "#fff", name: "White" },
      { color: "#f28b82", name: "Red" },
      { color: "#fbbc04", name: "Orange" },
      { color: "#fff475", name: "Yellow" }
    ],

    [
      { color: "#ccff90", name: "Green" },
      { color: "#a7ffeb", name: "Teal" },
      { color: "#cbf0f8", name: "Blue" },
      { color: "#aecbfa", name: "Darkblue" }
    ],

    [
      { color: "#d7aefb", name: "Purple" },
      { color: "#fdcfe8", name: "Pink" },
      { color: "#e6c9a8", name: "Brown" },
      { color: "#e8eaed", name: "Gray" }
    ]
  ];

  constructor(
    private notes: NoteServicesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getLabels();
  }

  colorsEdit(color, card) {
    console.log(card, "cardd..............");
    console.log(color, "color........");
    if (card == undefined) {
      this.color.emit(color);
    } else {
      card.color = color;
      this.updateColor(color, card);
    }
  }

  updateColor(color, card) {
    console.log(card, "card..");
    console.log((card.color = color), "color..");
    this.notes
      .updateColor({
        color: color,
        noteid: [card._id]
      })
      .subscribe(
        data => {
          console.log(data, "update color data");
        },
        err => {
          console.log(err, "err");
        }
      );
  }



  doArchive(card) {
    if (card == undefined) {
      this.archivedNoteCard.emit(true);
    } else {
      console.log(this.card, "cardddd");
      console.log(card._id, "cardidddddddddd");
      this.notes
        .archiveNote({
          archive: true,
          noteid: card._id
        })
        .subscribe(data => {
          console.log(data, "dataaaaaaaaaaaaaaaaaaaaa");
          console.log(card, "yyyyyyyyyyyyyy");
          this.cardArchive(card);
        }),
        err => console.log(err);
    }
  }

  cardArchive(card) {
    card.archive = true;
    this.archivedCard.emit(card);
  }

  doUnArchive(card) {
    console.log("aaaaaaaaaaaaaaaaaa", card)
    this.notes
      .archiveNote({
        archive: false,
        noteid: card._id
      })
      .subscribe(data => {
        this.notArchive(card);
      }),
      err => console.log(err);
  }
  notArchive(card) {
    card.archive = false;
    this.unarchiveCard.emit(card);
  }

  deleteNote(card) {
    console.log("delete note", card._id)
    this.notes
      .trashNote({
        trash: true,
        noteid: card._id
      })
      .subscribe(
        data => {
          console.log(data, "response ==> delete is clicked");
          this.cardDelete(card)
        },
        err => console.log(err)
      );
  }
  cardDelete(card) {
    card.trash = true;
    this.deletecard.emit(card);
  }

  // openLabel(){
  //   {
  //     try {
  //       const dialogRef = this.dialog.open(LabeliditComponent, {
  //         width:'auto',
  //         data:{}

  //       })

  //     } catch (error) {
  //       console.log("error occured");
  //     }
  //   }
  // }

  reverseFlag() {
    this.flag2 = !this.flag2;
  }

  openSnackBar1() {
    this.snackBar.open("Note archived", "Ok", { duration: 2000 });
  }
  openSnackBar2() {
    this.snackBar.open("Note unarchived", "Ok", { duration: 2000 });
  }
  openSnackBar3() {
    this.snackBar.open("Note trashed", "Ok", { duration: 2000 });
  }

  getLabels() {
    try {
      var userid = localStorage.getItem("userid");
      this.notes.getLableList().subscribe(data => {
        console.log("labels in labels edit comp==>", data);

        this.labelsList = data["data"];
        this.labelsList = this.labelsList.reverse();
      });
    } catch (error) {
      console.log("error at getting labels");
    }
  }

  /******* To add labels  *********/

  // addLabel(label) {
  //   try {
  //     var userid = localStorage.getItem("userid");
  //     this.notes
  //       .postLabel({
  //         label: label,
  //         userid: userid
  //       })
  //       .subscribe(data => {
  //         console.log("skjhg", data);

  //         this.labelsList.splice(0, 0, data["data"]);
  //         this.label = "";
  //       });
  //   } catch (error) {
  //     console.log("Error at adding label");
  //   }
  // }

  doSomething($event: any) {
    this.flag3 = !this.flag3;
    $event.stopPropagation();
    //Another instructions
  }

  saveLabeltoNote(card, label) {

    console.log("jguyagdfuagsfuiyagsffffffffffffffffffffff", label.label)
    if (card == undefined) {
      this.emitlabelid.emit(label.label);
    } else {
      console.log("lllllllllllllllllllllll", card._id, label.label);
      this.notes
        .saveLabelToNote({
          noteid: card._id,
          labelid: label.label,

        })
        .subscribe(data => {
          card["label"].push(label.label);
          console.log("dkjsf==>", card);

          console.log("data in save labels", data);
        });
    }

  }


  fileChangeEvent(event: any) {
    // this.imageChangedEvent = event;
    const image = event.target.files[0];
    const noteid = this.card._id
    console.log("this is note or cardid", noteid)
    // console.log("file ",file);
    // console.log("file... ",this.fileToUpload);
    const data = {
      'image': image,
      'noteid': this.card._id
    }
    console.log("created image object", data);
   this.notes.noteimage(data).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log("error message");

        console.log(error);
      });
  }


  getReminderr($event) {
    var reminder = $event
    this.emitReminderNote.emit(reminder)
  }

}