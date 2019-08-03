import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user/user.service";
import { DataServicesService } from "../../service/dataServices/data-services.service"
import { HttpService } from"../../service/http/http.service"
import { from } from "rxjs";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  arrayCard: any[];
  layout = "row wrap";
  view;
  wrap = "wrap";
  direction;
  label:any
  cards:any

  constructor(private userService : UserService , private dataService: DataServicesService, private http:HttpService) {}

  ngOnInit() {

    this.dataService.getLabel.subscribe(message =>{
      this.label=message;
      this.getNotes();
    })


    // this.noteService.getView().subscribe((res: any) => {
    //   // debugger
    //   console.log(res);
    //   this.view = res;
    //   this.direction = this.view.data;
    //   this.layout = this.direction + " " + this.wrap;
   // });
  }

  getNotes(){

    this.userService. getnotee() .subscribe(data => {
      console.log(data);
      console.log(data["data"], "ghghfghvfghfghghghdf");
      // this.cards = data['data'];
      var data1 = data["data"];
      for (let i = 0; i < data1.length; i++) {
        if (!data1[i].archive && !data1[i].trash && data1[i].label) {
          this.cards.push(data1[i]);
        }
      }
      this.cards = this.cards.reverse();
    });
    // this.noteService.getNotesOfLabel(this.label.label).subscribe(data=>{
    //   this.arrayCard=data['data'];
    //   this.arrayCard=this.arrayCard.reverse();
    //   console.log(this.arrayCard,"card in editlabel")
    // })
  }
}