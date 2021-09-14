const db=require('./db')
const jwt=require('jsonwebtoken')
users = {
  1000: { accno: 1000, password: "bala", username: "bala", balance: 50000, transaction: [] },
  1001: { accno: 1001, password: "Kiran", username: "kiran", balance: 40000, transaction: [] },
  1002: { accno: 1002, password: "Meera", username: "meera", balance: 30000, transaction: [] },
  1003: { accno: 1003, password: "Hari", username: "hari", balance: 20000, transaction: [] }
}


const register = (accno, password, username) => {
  return db.User.findOne({accno})
  .then(user=>{
    if(user){
      return {
        statusCode: 422,
        status: false,
        message: "User exist!Please login"
      }
    }
    else
    {
      const newUser=new db.User({
        accno, password, username, balance: 0, transaction: []
      })
      newUser.save()
      return {
        statusCode: 200,
        status: true,
        message: "success"
      }
    }
  })
  // if (accno in users) {
    
    
  // }
  // else {
  //   users[accno] = { accno, password, username, balance: 0, transaction: [] }

  // }
  // console.log(accdetails);

  
}

const login = (req,no, pass) => {
  // var accdetails=this.users;
  // console.log(no);
  return db.User.findOne({
    accno:no,
    password:pass
  })
  .then(user=>{
    if(user){
      // req.session.currentacc = user.accno
      const token=jwt.sign({
        currentacc:user.accno
      },'supersecretkey122323')
      return {
        statusCode: 200,
        status: true,
        message: "succesfully login",
        newUser:user.username,
        currentacc:user.accno,
        token
      }
    }
    return {
      statusCode: 422,
      status: false,
      message: "invalid user"
    }
  })
}
//   if (no in users) {
//     if (pass == users[no]["password"]) {
//       currentuser = users[no]["username"]
//      req.session.currentacc = no;


//       return {
//         statusCode: 200,
//         status: true,
//         message: "succesfully login"
//       }

//     }
//     else {

//       return {
//         statusCode: 422,
//         status: false,
//         message: "invalid password"
//       }

//     }
//   }
//   else {

//     return {
//       statusCode: 422,
//       status: false,
//       message: "invalid accouunt number"
//     }
//   }
// }

const deposit = (accno, pswd, amount) => {
  // let accDetails=this.users
  
  var amt = parseInt(amount)
  return db.User.findOne({
    accno,
    password:pswd
  }).then(user=>{
    if(!user){
      return {
        statusCode: 422,
        status: false,
        message: "invalid user"
      }
    }
    user.balance+=amt
    user.transaction.push({
      amount: amt,
        type: "credit"
    })
    user.save()
    return {
      statusCode: 200,
      status: true,
      message: amt + "succesfully credited. Balance  " + user.balance
    }
  })
  // if (accno in users) {
  //   if (pswd == users[accno]["password"]) {
  //     users[accno]["balance"] += amt
  //     users[accno].transaction.push({
  //       amount: amt,
  //       type: "credit"
  //     })
  //     // this.savedetails()
  //     // console.log(users[accno].transaction);
  //     return {
  //       statusCode: 200,
  //       status: true,
  //       message: amt + "succesfully credited. Balance  " + users[accno]["balance"]
  //     }
  //   }
  //   else {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "invalid password"
  //     }
  //   }
  // }
  // else {
  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "invalid accountnumber"
  //   }
  // }
}

const withdraw = (req,accno, pswd, amount) => {
  // let accDetails = this.users
  var amt = parseInt(amount)
  return  db.User.findOne({
    accno,
    password:pswd
  }).then(user=>{
    if(!user){
      return {
        statusCode: 422,
        status: false,
        message: "invalid user"
      }
    }
    if(req.session.currentacc!=user.accno){
      return {
            statusCode: 422,
            status: false,
            message: "operation denied"
          }
    }
    if(user.balance<amt)
    {
      return {
        statusCode: 422,
        status: false,
        message: "insufficient Balance"
      }
    }
    user.balance-=amt
    user.transaction.push({
      amount: amt,
        type: "debit"
    })
    user.save()
    return {
      statusCode: 200,
      status: true,
      message: amt + "succesfully debited. Balance  " + user.balance
    }
  })
  // if (accno in users) {
  //   if (pswd == users[accno]["password"]) {
  //     if (users[accno]["balance"] > amt) {
  //       users[accno]["balance"] -= amt
  //       users[accno].transaction.push({
  //         amount: amt,
  //         type: "debit"
  //       })
  //       console.log(users[accno].transaction);
  //       return {
  //         statusCode: 200,
  //         status: true,
  //         message: amt + "succesfully debited . Balance  " + users[accno]["balance"]
  //       }
  //       // this.savedetails()
  //       // return accDetails[accno]["balance"]
  //     }
  //     else {
  //       return {
  //         statusCode: 422,
  //         status: false,
  //         message: "insufficient Balance"
  //       }
  //     }
  //   }
  //   else {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "invalid password"
  //     }
  //   }
  // }
  // else {
  //   return {
  //     statusCode: 422,
  //     status: false,
  //     message: "invalid accountnumber"
  //   }
  // }
}

const gettransaction = (accno)=>
{
// return "helloxfxcgfcgd"
return db.User.findOne({
  accno
}).then(user=>{
  if(user){
    return{
      statusCode:200,
      status:true,
      transaction:user.transaction
    }
  }
  else{
    return{
      statusCode:422,
      status:false,
      message:"invalid operation"
    }
  }
})
// return {
//   statusCode: 200,
//   status: true,
//   transaction: users[req.session.currentacc].transaction
// }
//  return this.users[this.currentacc].transaction
}

const deleteAcc = (acno)=>
{
  return db.User.deleteOne({
    accno:acno
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
        message:"Account number" + acno +"deleted successfully"
      }
    }
  })
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction,
  deleteAcc
}