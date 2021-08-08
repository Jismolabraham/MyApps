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
  constructor(private router: Router, private ds: DataService) { }

  ngOnInit(): void {
  }


  addevent() {
    var uid = this.uid;
    var date = this.date;
    var event = this.event;
    var result = this.ds.addevent(uid, date, event)
    if (result) {
      alert("event added")
    }
  }

  
  


}
