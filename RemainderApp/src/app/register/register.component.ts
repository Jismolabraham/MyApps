import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uid="userid";
  uname="";
  pwd="";
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }
register()
{
  var uid=this.uid;
  var uname=this.uname;
  var pwd=this.pwd;
  // console.log(this.uid)
  // console.log(this.pwd);
  
 var result=this.ds.register(uid,uname,pwd)
 if(result)
 {
   alert("register succes")
   this.router.navigateByUrl("")
 }
}
}
