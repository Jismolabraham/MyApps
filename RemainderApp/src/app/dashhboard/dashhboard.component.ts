import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-dashhboard',
  templateUrl: './dashhboard.component.html',
  styleUrls: ['./dashhboard.component.css']
})
export class DashhboardComponent implements OnInit {
  uid = "enter user id"
  date = "enter date"
  event = "enter event"

  uid1 = "enter user id"
  date1 = "enter date"
  event1 = "enter event"
  user = this.ds.currentuser
  newUser: any
  currentuid: any
  today:any
  dateonly:any
  todayevents:any
  constructor(private router: Router, private ds: DataService) {
    this.newUser = localStorage.getItem("newUser")
    this.today=new Date()
    this.dateonly=new Date().toISOString().slice(0,10)
    
    this.ds.remind(this.dateonly)
    .subscribe((result:any)=>{
      
      
      this.todayevents=result.todayEvents
      console.log(this.todayevents);
      
      },
      (result:any)=>{
        alert(result.error.message);
        
      })
  }

  ngOnInit(): void {
  }


  addevent() {
    var uid = this.uid;
    var date = this.date;
    var event = this.event;
    this.ds.addevent(uid, date, event)
      .subscribe((result: any) => {
        alert(result.message)
      },
        (result) => {
          alert(result.error.message)
        })
    // if (result) {
    //   alert("event added")
    // }


  }


  deleteAcc() {
    this.currentuid = localStorage.getItem("currentuserid")
  }
  ondeleteatparent(event:any){
    // alert(event)
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )

  }

  cancelatparent()
  {
    this.currentuid=""
  }


}
