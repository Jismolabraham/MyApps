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
  aim = "Welcome to reminderApp"
  uid = ""
  pwd = ""
  currentuser = ""
  today=new Date()

  loginform = this.fb.group({
    uid: ['enter userid', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['pwd', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  login() {
    if (this.loginform.valid) {
      var uid = this.loginform.value.uid;
      var pwd = this.loginform.value.pwd;
      // console.log(uid);


      this.ds.login(uid, pwd)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem("newUser",result.newUser)
            localStorage.setItem("currentuserid",result.currentuser)
            alert(result.message)
            this.router.navigateByUrl("dashboard")
          }
        },
        (result)=>{
          alert(result.error.message)
          
        })
        
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
