import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentuser=""
  currentid=""
  users :any= {
    1000: {userid:1000,username:"bala", password:"bala11",events:[]},
    1001: {userid:1001,username:"Sam", password:"sam",events:[]},
    1002: {userid:1002,username:"kevin", password:"kevin",events:[]},
    1003: {userid:1003,username:"kiran", password:"kiran",events:[]}
  }

  constructor(private router:Router) {
    this.getdata()
   }

 savedata()
 {
   localStorage.setItem("users",JSON.stringify(this.users))
   if(this.currentuser){
   localStorage.setItem("currentuser",JSON.stringify(this.currentuser))
  }
  if(this.currentid)
  {
   localStorage.setItem("currentid",JSON.stringify(this.currentid))
  }
 }
 getdata()
 {
 if(localStorage.getItem("users")){
  this.users=JSON.parse(localStorage.getItem("users")||'')
 }
 if(localStorage.getItem("currentuser"))
 {
   this.currentuser=JSON.parse(localStorage.getItem("currentuser")||'')
 }
 if(localStorage.getItem("currentid"))
 {
   this.currentid=JSON.parse(localStorage.getItem("currentid")||'')
 }
  
  
 }
 
  register(userid:any,username:any,password:any)
  {
    let userdetails=this.users
    if(userid in userdetails)
    {
      alert("exist")
      return false;
    }
    else
    {
      userdetails[userid]={userid,username,password,events:[]}
      // console.log(userdetails);
      this.savedata()
      // alert("successfully registered")
      return true
    }
   
  }

  login(userid:any,password:any)
  {
    let userdetails=this.users
    console.log(password);
    if(userid in userdetails)
    {
      if(password==userdetails[userid]["password"])
      {
        alert("login succes")
        this.currentid=userid;
        this.currentuser=userdetails[userid]["username"]
        this.savedata();
        this.router.navigateByUrl("dashboard")
        
      }
      else
      {
        alert("invalid password")
      }
    }
    else
    {
      
      alert("invalid account number")
    }
    
  }
  getevents()
  {
    // console.log(this.users[this.currentuser].events);
    
    return this.users[this.currentid].events
  }
 
 

  // login(no:any,pass:any)
  // {
  //   var accdetails=this.users;
  //   // console.log(no);
    
  //   if(no in this.users)
  //   {
  //     if(pass==accdetails[no]["password"])
  //     {
  //       this.currentuser=accdetails[no]["username"]
  //       this.currentacc=no;

  //       this.savedetails()
  //       return true
       
  //     }
  //     else
  //     {
  //       alert("invalid password")
  //       return false
        
  //     }
  //   }
  //   else
  //   {
  //     alert("enter a valid account number")
  //     return false
  //   }
  // }



  addevent(uid:any,date:any,event:any)
  {
    let userdetails=this.users;
    userdetails[uid].events.push({
      date:date,
      event:event
    })
    this.savedata()
    return true
  }
  


}
