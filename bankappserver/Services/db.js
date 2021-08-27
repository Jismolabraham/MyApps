const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/bankAppServer',{
        useNewUrlParser:true,
        useUnifiedTopology:true
})

const User=mongoose.model('User',{
    accno:Number,
    password:String,
    username:String,
    balance:Number,
    transaction:[]
})
module.exports={
    User
}