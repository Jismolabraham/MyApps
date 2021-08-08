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
  constructor(public ds:DataService) {
    this.events=this.ds.getevents()
    console.log(this.events)
   }
 
  ngOnInit(): void {
  }

}
