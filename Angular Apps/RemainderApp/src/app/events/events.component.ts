import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:any
  uid:any
  today=new Date()
  currentuid:any
  index:any
  index1:any
  date:any
  event:any
  date1:any
  event1:any
  constructor(public ds:DataService,private router:Router) {
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
  deleteEvent(i:any)
  {
    // console.log(i);
    
    this.currentuid=localStorage.getItem("currentuserid")
    this.index=i;
  }
  editEvent(i:any,date:any,event:any){
    console.log(i,date,event);
    this.currentuid=localStorage.getItem("currentuserid")
    this.index1=i;
    this.date=date;
    this.event=event
  }
  ondeleteatparent(event:any){
    // console.log(event);

    this.ds.deleteoneevent(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        window.location.reload()
      }
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )
    
  }
  cancelatparent(){
    this.index=""
  }
  onsaveatparent(i:any,date1:any,event1:any){
    
    // alert(i)
    this.ds.saveoneevent(i,date1,event1)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        window.location.reload()
      }
    },
    (result:any)=>{
      alert(result.error.message)
    })
  }
  cancelsaveatparent(){
    this.index1=""
  }
}
