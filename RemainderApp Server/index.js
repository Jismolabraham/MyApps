const express=require('express')
const app=express()
const dataServices=require('./services/data.service')
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("GET METHOD")
})

app.post('login',(req,res)=>{
    res.send("GET METHOD")
})

app.post('/login',(req,res)=>{
    console.log(req.body);
//     const result = dataService.login(req.body.no,req.body.pass)
//    res.status(result.statusCode).send(result.message)
const result = dataServices.login(req.body.userid,req.body.password)
res.status(result.statusCode).json(result)
// json(result)----- the result will display in json format itself
})

app.listen(3000,()=>{
    console.log("server started at :3000")
})