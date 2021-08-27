import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:any
  uid:any
  constructor(public ds:DataService) {
    this.uid=localStorage.getItem("currentuserid")
    this.ds.getevents(this.uid)
    .subscribe((result:any)=>{
      if(result){
        console.log(result);
        this.events=result.events
      }
    } ,  
    (result:any)=>{
      alert(result.error.message)
    }
    )
    console.log(this.events)
   }
 
  ngOnInit(): void {
  }

}
