const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/RemainderAppServer',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const User=mongoose.model('User',{
    userid:Number,
    username:String,
    password:String,
    events:[]

})

module.exports={
    User
}