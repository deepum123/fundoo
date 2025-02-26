import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../service/http/http.service";
import {UserService} from '../../service/user/user.service'
@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  cards: any = [];
  addnote: any;
  allcards = [];
  constructor(
    public http: HttpService,
    private userService:UserService
  ) {}
  wrap: string = "wrap";
  direction;
  view;
  layout;

  ngOnInit() {
     this.getCards();
    // this.noteService.getView().subscribe((res: any) => {
    //   // debugger
    //   this.view = res;
    //   this.direction = this.view.data;
    //   this.layout = this.direction + " " + this.wrap;
    // });
  }

  getCards() {
    this.userService.getnotee().subscribe(data => {
      console.log(data);
      console.log(data["data"], "ghghfghvfghfghghghdf");
      // this.cards = data['data'];
      var data1 = data["data"];
      for (let i = 0; i < data1.length; i++) {
        if (!data1[i].archive && !data1[i].trash && data1[i].remainder[0]) {
          this.cards.push(data1[i]);
        }
      }
      this.cards = this.cards.reverse();
      console.log("gggggggggggggggg",this.cards)
    });
  }
  recievemessage($event) {
    this.addnote = $event;
    console.log(this.addnote, "......addnote");
    this.allcards.push(this.addnote);
    this.ngOnInit();
  }
}