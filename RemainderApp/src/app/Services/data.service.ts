import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
const options={
  withCredentials:true
}
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

  constructor(private router:Router,private http:HttpClient) {
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
    const data={userid,
    username,
    password}
    return this.http.post("http://localhost:3000/register",data)
    // let userdetails=this.users
    // if(userid in userdetails)
    // {
    //   alert("exist")
    //   return false;
    // }
    // else
    // {
    //   userdetails[userid]={userid,username,password,events:[]}
    //   // console.log(userdetails);
    //   this.savedata()
    //   // alert("successfully registered")
    //   return true
    // }
   
  }

  login(userid:any,password:any)
  {
    const data={
      userid,
      password
    }
    return this.http.post("http://localhost:3000/login",data,options)
    // let userdetails=this.users
    // console.log(password);
    // if(userid in userdetails)
    // {
    //   if(password==userdetails[userid]["password"])
    //   {
    //     alert("login succes")
    //     this.currentid=userid;
    //     this.currentuser=userdetails[userid]["username"]
    //     this.savedata();
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
  getevents(uid:any)
  {
    const data={
      uid
    }
    // console.log(this.users[this.currentuser].events);
    
    return this.http.post("http://localhost:3000/getevent",data,options)
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
    const data={
      uid,
      date,
      event
    }
    return this.http.post("http://localhost:3000/addevent",data,options)

    // let userdetails=this.users;
    // userdetails[uid].events.push({
    //   date:date,
    //   event:event
    // })
    // this.savedata()
    // return true
  }
  
deleteAcc(event:any){
  return this.http.delete("http://localhost:3000/deleteAcc/"+event,options)
}

remind(dateonly:any){
  // console.log(dateonly);
  const data={
    dateonly
  }
  return this.http.post("http://localhost:3000/remind",data,options)
}

}
