const db = require('./db')
users = {
  1000: { userid: 1000, username: "bala", password: "bala11", events: [] },
  1001: { userid: 1001, username: "Sam", password: "sam", events: [] },
  1002: { userid: 1002, username: "kevin", password: "kevin", events: [] },
  1003: { userid: 1003, username: "kiran", password: "kiran", events: [] }
}


const login = (req, userid, password) => {
  return db.User.findOne({
    userid,
    password
  })
    .then(user => {
      if (user) {
        req.session.currentid = user.userid
        return {
          statusCode: 200,
          status: true,
          message: "succesfully logged in",
          newUser: user.username,
          currentuser: user.userid
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "User is not valid"
        }
      }
    })
  // if (userid in users) {
  //   if (password == users[userid]["password"]) {
  //     // alert("login succes")
  //     // currentid = userid;
  //     currentuser = users[userid]["username"]
  //     req.session.currentid = userid;
  //     return {
  //       statusCode: 200,
  //       status: true,
  //       message: "succesfully logged in"
  //     }

  //   }
  //   else {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "Invalid password"
  //     }
  //   }
  // }
  // else {

  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "Invalid User Id"
  //   }

  // }

}

const register = (userid, username, password) => {
  return db.User.findOne({ userid })
    .then(user => {
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "Use already exist!! Please login"
        }
      }
      else {
        const newUser = new db.User({
          userid, username, password, events: []
        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "Succesfully Registered"
        }
      }
    })
  // if (userid in users) {

  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "Use already exist!! Please login"
  //   }
  // }
  // else {
  //   users[userid] = { userid, username, password, events: [] }

  //   return {
  //     statusCode: 200,
  //     status: true,
  //     message: "Succesfully Registered"
  //   }
  // }

}

const addevent = (uid, date, event) => {
  return db.User.findOne({ userid: uid })
    .then(user => {
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "User is not valid"
        }
      }

      user.events.push({
        date: date,
        event: event
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: "Event added succesfully"
      }
    })
  // users[uid].events.push({
  //   date: date,
  //   event: event
  // })

  // // console.log(users[uid].events);
  // return {
  //   statusCode: 200,
  //   status: true,
  //   message: "Event added succesfully"
  // }
}

const getevents = (uid) => {
  return db.User.findOne({
    userid: uid
  }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        events: user.events
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "invalid opreration"
      }
    }
  })
  // console.log(this.users[this.currentuser].events);
  // return {
  //   statusCode: 200,
  //   status: true,
  //   event: users[req.session.currentid].events
  // }
  // return this.users[this.currentid].events
}
const deleteAcc=(uid)=>{
  return db.User.deleteOne({
    userid:uid
  }).then(user=>{
    if(!user){
      return{
        statusCode:422,
        status:false,
        message:"operation failed"
      }
    }
    else
    {
      return{
        statusCode:200,
        status:true,
        message:"User id"+uid+"deleted sccessfully"
      }
    }
  })
}



const deleteonevent=(req,i)=>{
  return db.User.findOne({
    userid:req.session.currentid
  }).then(user=>{
    if(user){
      user.events.splice(i,1)
      console.log(user.events);
      user.save()
      return{
        statusCode:200,
        status:true,
        events:user.events,
        message:"Event deleted successfully"
      }
    }
    else
    {
      return{
        statusCode:422,
        status:true,
        message:"ivalid operation"
      }
    }
  })
}

const saveoneevent=(req,i,date,event)=>{
  console.log(event);
  return db.User.findOne({
    userid:req.session.currentid
  }).then(user=>{
    if(user){
      user.events.splice(i,1,{
        date,event
      })
      console.log(user.events);
      user.save()
      return{
        statusCode:200,
        status:true,
        events:user.events,
        message:"Event updated successfully"
      }
    }
    else
    {
      return{
        statusCode:422,
        status:true,
        message:"ivalid operation"
      }
    }
  })
}

const remind=(req,dateonly)=>{
  return db.User.findOne({
    userid:req.session.currentid
  })
  .then(user=>{
    todayEvents=[]
    if(user){
      let events=user.events
      for (let event of events){
        if(dateonly==event.date){
          todayEvents.push(event)
        }
      }
      return{
        statusCode:200,
        status:true,
        todayEvents:todayEvents,
        message:"Today events"
      }
    }
    else
    {
      return{
        statusCode:422,
        status:false,
        message:"No events"
      }
    }
  })
}

module.exports = {
  login,
  register,
  addevent,
  getevents,
  deleteAcc,
  remind,
  deleteonevent,
  saveoneevent
}