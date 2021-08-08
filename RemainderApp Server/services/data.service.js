users = {
    1000: { userid: 1000, username: "bala", password: "bala11", events: [] },
    1001: { userid: 1001, username: "Sam", password: "sam", events: [] },
    1002: { userid: 1002, username: "kevin", password: "kevin", events: [] },
    1003: { userid: 1003, username: "kiran", password: "kiran", events: [] }
}


const login=(userid, password)=>
{

    if (userid in users) {
        if (password == users[userid]["password"]) {
            alert("login succes")
            currentid = userid;
            currentuser = userdetails[userid]["username"]

            return {
                statusCode: 200,
                status: true,
                message: "succesfully logged in"
            }

        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Invalid password"
            }
        }
    }
    else {

        return {
            statusCode: 422,
            status: false,
            message: "Invalid Account Number"
        }

    }

}
module.exports={
    login
}