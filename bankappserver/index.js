const express=require('express')
const dataService=require('./Services/data.service')
const session=require('express-session')
const app = express()
app.use(express.json())
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
app.use((req,res,next)=>{
    console.log("Application specific middlewere");
    next();
})

//router specificmiddleware
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentacc)
  {
      res.json( {
      statusCode: 422,
      status: false,
      message: "please login"
    })
  }
  else
  {
      next()
  }
}

app.get('/',(req,res)=>{
    res.send("GET METHOD")
})

app.post('/',(req,res)=>{
    res.send("POST METHOD")
})

app.put('/',(req,res)=>{
    res.send("Put METHOD")
})

app.patch('/',(req,res)=>{
    res.send("Patch METHOD")
})

app.delete('/',(req,res)=>{
    res.send("Delete METHOD")
})

app.post('/register',(req,res)=>{
    // console.log(req.body);
    // const result = dataService.register(req.body.accno,req.body.password,req.body.username)
    // res.status(result.statusCode).send(result.message)
    const result = dataService.register(req.body.accno,req.body.password,req.body.username)
    res.status(result.statusCode).json(result)
})
app.post('/login',(req,res)=>{
    console.log(req.body);
//     const result = dataService.login(req.body.no,req.body.pass)
//    res.status(result.statusCode).send(result.message)
const result = dataService.login(req,req.body.no,req.body.pass)
res.status(result.statusCode).json(result)
// json(result)----- the result will display in json format itself
})

app.post('/deposit',authMiddleware,(req,res)=>{
    // console.log(req.body);
//     const result = dataService.login(req.body.no,req.body.pass)
//    res.status(result.statusCode).send(result.message)
const result = dataService.deposit(req.body.accno,req.body.password,req.body.amount)
res.status(result.statusCode).json(result)
// json(result)----- the result will display in json format itself
})

app.post('/withdraw',authMiddleware,(req,res)=>{

const result = dataService.withdraw(req.body.accno,req.body.password,req.body.amount)
res.status(result.statusCode).json(result)

})

app.post('/transaction',authMiddleware,(req,res)=>{

    const result = dataService.gettransaction(req)
    res.status(result.statusCode).json(result)
    
    })

app.listen(3000,()=>{
    console.log("server started at :3000")
})