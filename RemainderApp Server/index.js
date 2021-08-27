const express = require('express')
const dataServices = require('./services/data.service')
const session = require('express-session')
const cors=require('cors')
const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))

const authMiddleware = (req, res, next) => {
    if (!req.session.currentid) {
        res.json({
            statusCode: 422,
            status: false,
            message: "please log in"
        })
    }
    else {
        next()
    }
}

app.get('/', (req, res) => {
    res.send("GET METHOD")
})

app.post('login', (req, res) => {
    res.send("GET METHOD")
})

app.post('/login', (req, res) => {
    // console.log(req.body);
    //     const result = dataService.login(req.body.no,req.body.pass)
    //    res.status(result.statusCode).send(result.message)
    dataServices.login(req, req.body.userid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

    // json(result)----- the result will display in json format itself
})

app.post('/register', (req, res) => {
    dataServices.register(req.body.userid, req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

app.post('/addevent', authMiddleware, (req, res) => {
    dataServices.addevent(req.body.uid, req.body.date, req.body.event)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

app.post('/getevent', authMiddleware, (req, res) => {
    dataServices.getevents(req.body.uid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

app.delete('/deleteAcc/:event', authMiddleware, (req, res) => {
    dataServices.deleteAcc(req.params.event)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

app.post('/remind', authMiddleware, (req, res) => {
    dataServices.remind(req,req.body.dateonly)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

app.listen(3000, () => {
    console.log("server started at :3000")
})