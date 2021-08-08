import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="Welcome to remainderApp"
  uid=""
  pwd=""
  currentuser=""

  loginform=this.fb.group({
    uid:['enter userid',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['pwd',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  
  
  constructor(private router:Router, private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  login()
  {
    if(this.loginform.valid){
    var uid=this.loginform.value.uid;
    var pwd=this.loginform.value.pwd;
    // console.log(uid);
    
    
    this.ds.login(uid,pwd)
    }
    // let userdetails=this.ds.users;
    // // console.log(userdetails[uid]["password"]);
    
    // if(uid in userdetails)
    // {
    //   if(pwd==userdetails[uid]["password"])
    //   {
    //     alert("login succes")
    //     this.currentuser=uid;
    //     this.router.navigateByUrl("dashboard")
        
    //   }
    //   else
    //   {
    //     alert("invalid password")
    //   }
    // }
    // else
    // {
    //   alert("invalid account number")
    // }
  }
 
}
