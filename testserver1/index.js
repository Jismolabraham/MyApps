const express=require('express')
const dataservices=require('./services/data.service')
const session=require('express-session')
app.use(express.json())
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
const app=express();
app.get('/',(req,res)=>{
    res.send("Get Method")
})
app.listen(3000,()=>{
    console.log("serever started at 3000");
})