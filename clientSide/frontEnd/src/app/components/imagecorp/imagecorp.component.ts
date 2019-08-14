import { Component, OnInit, NgModule, Inject, ɵConsole } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NoteServicesService } from "../../service/noteServices/note-services.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from 'src/app/service/http/http.service';


@Component({
  selector: 'app-imagecorp',
  templateUrl: './imagecorp.component.html',
  styleUrls: ['./imagecorp.component.scss']
})
export class ImagecorpComponent implements OnInit {
  imagecroped: any;
  response: any;
  img: any;
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private noteServicesService: NoteServicesService,
    private http: HttpService
  ) { }

  ngOnInit() { }

  imageCropped($event) {
    console.log("data", this.data);

    console.log("cropper==>", $event.file);

    this.img = $event.file;
    console.log("kdsghfdsghfdsakljidfhsifhdkaishihf", this.img);
  }

  close() {
    this.dialogRef.close();
  }
  submit() {
    console.log('hhqqqqqqqqqqqqqqqqqqqqqqqqq',this.img)
    var formData = new FormData();
    formData.append("image", this.img);
   console.log("ddddddddddddddddddddddd",formData)
    this.noteServicesService.profilePic(formData).subscribe((data:any) => {
      console.log("------------------------------", data);
      console.log("------------------------------", data.data.uploadImage);
       localStorage.setItem("profilepic",  data.data.uploadImage);
       this.dialogRef.close( data.data.uploadImage);
     
    });
  }

  fileChangeEvent(event: any) {
    // this.imageChangedEvent = event;
    const image = event.target.files[0];
    const userID = localStorage.getItem('userid')
    // console.log("file ",file);
    // console.log("file... ",this.fileToUpload);
    const data = {
      'image': image,
      'userid': userID
    }
    console.log("created image object", data);
    // this.http.userimage(image, userID).subscribe(data => {
    //   console.log(data);
    // },
    //   error => {
    //     console.log("error message");

    //     console.log(error);
    //   });
  }

}