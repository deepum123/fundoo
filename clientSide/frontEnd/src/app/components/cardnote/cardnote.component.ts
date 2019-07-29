
import { HttpService } from "../../service/http/http.service";
import { NoteServicesService} from "../../service/noteServices/note-services.service";
import { Component, OnInit } from "@angular/core";
import {UserService} from "../../service/user/user.service";
@Component({
  selector: 'app-cardnote',
  templateUrl: './cardnote.component.html',
  styleUrls: ['./cardnote.component.scss']
})
export class CardnoteComponent implements OnInit {
  
  allcards = [];
  card = [];
  addnote: any;
  constructor(
    public userService: UserService,
    private noteService: NoteServicesService
  ) {}
  cards: any = [];
  wrap: string = "wrap";
  direction;
  view;
  flag = false;
  layout;
  unpinned = [];
  pin: "pin";
  unpin: "unpin";
  // note='note'
  ngOnInit() {
    this.getCards(); 
  }
  
  getCards() {
    this.userService.getnotee().subscribe(data => {
      console.log(
        "get cards data==>",
        data
      );
      console.log("data in notes=====>", data["data"]);
      // this.cards = data['data'];
      var data1 = data["data"];
      this.cards = [];
      this.allcards = [];
      for (let i = 0; i < data1.length; i++) {
        if (!data1[i].archive && !data1[i].trash && data1[i].pinned) {
          this.cards.push(data1[i]);
          console.log("hii",this.cards)
        } else if (!data1[i].archive && !data1[i].trash && !data1[i].pinned) {
          this.allcards.push(data1[i]);
          console.log("allcards",this.allcards)
        }
      }
      this.cards = this.cards.reverse();
      this.allcards = this.allcards.reverse();
      console.log("all card is ", this.cards);
    });
  }
  
  recievemessage($event) {
    this.addnote = $event;
    console.log(this.addnote, "......addnote");
    
    this.getCards();
  }
  getPinCard($event) {
    let ind = this.allcards.indexOf($event);
    this.allcards.splice(ind, 1);
    this.cards.splice(0, 0, $event);
  }
  getUnpinCard($event) {
    let ind = this.cards.indexOf($event);
    this.cards.splice(ind, 1);
    this.allcards.splice(0, 0, $event);
  }
  dialogResult($event) {
    console.log($event, "event in note");

    if ($event.pinned) {
      let ind = this.allcards.indexOf($event);
      this.allcards.splice(ind, 1);
      this.cards.splice(0, 0, $event);
    } else {
      let ind = this.cards.indexOf($event);
      this.cards.splice(ind, 1);
      this.allcards.unshift($event);
    }
  }
}
  
