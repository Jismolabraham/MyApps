users = {
  1000: { accno: 1000, password: "bala", username: "bala", balance: 50000, transaction: [] },
  1001: { accno: 1001, password: "Kiran", username: "kiran", balance: 40000, transaction: [] },
  1002: { accno: 1002, password: "Meera", username: "meera", balance: 30000, transaction: [] },
  1003: { accno: 1003, password: "Hari", username: "hari", balance: 20000, transaction: [] }
}


const register = (accno, password, username) => {

  // return
  // let accdetails=this.users;
  if (accno in users) {
    // alert("user already exist!!!Please Login")
    return {
      statusCode: 422,
      status: false,
      message: "User exist!Please login"
    };
  }
  else {
    users[accno] = { accno, password, username, balance: 0, transaction: [] }

  }
  // console.log(accdetails);

  return {
    statusCode: 200,
    status: true,
    message: "success"
  }
}

const login = (req,no, pass) => {
  // var accdetails=this.users;
  // console.log(no);

  if (no in users) {
    if (pass == users[no]["password"]) {
      currentuser = users[no]["username"]
     req.session.currentacc = no;


      return {
        statusCode: 200,
        status: true,
        message: "succesfully login"
      }

    }
    else {

      return {
        statusCode: 422,
        status: false,
        message: "invalid password"
      }

    }
  }
  else {

    return {
      statusCode: 422,
      status: false,
      message: "invalid accouunt number"
    }
  }
}

const deposit = (accno, pswd, amount) => {
  // let accDetails=this.users
  
  var amt = parseInt(amount)
  if (accno in users) {
    if (pswd == users[accno]["password"]) {
      users[accno]["balance"] += amt
      users[accno].transaction.push({
        amount: amt,
        type: "credit"
      })
      // this.savedetails()
      // console.log(users[accno].transaction);
      return {
        statusCode: 200,
        status: true,
        message: amt + "succesfully credited. Balance  " + users[accno]["balance"]
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "invalid password"
      }
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "invalid accountnumber"
    }
  }
}

const withdraw = (accno, pswd, amount) => {
  // let accDetails = this.users
  var amt = parseInt(amount)
  if (accno in users) {
    if (pswd == users[accno]["password"]) {
      if (users[accno]["balance"] > amt) {
        users[accno]["balance"] -= amt
        users[accno].transaction.push({
          amount: amt,
          type: "debit"
        })
        console.log(users[accno].transaction);
        return {
          statusCode: 200,
          status: true,
          message: amt + "succesfully debited . Balance  " + users[accno]["balance"]
        }
        // this.savedetails()
        // return accDetails[accno]["balance"]
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "insufficient Balance"
        }
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "invalid password"
      }
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "invalid accountnumber"
    }
  }
}

const gettransaction = (req)=>
{
// return "helloxfxcgfcgd"

return {
  statusCode: 200,
  status: true,
  transaction: users[req.session.currentacc].transaction
}
//  return this.users[this.currentacc].transaction
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction
}