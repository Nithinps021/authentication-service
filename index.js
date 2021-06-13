const express = require('express')
const cookieParser=require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('dotenv').config()
const dataBase=require('./db/db')
const passportConfig= require('./Auth/passport_config')
const {ifAuthenticated,onlyAgent,onlyAdmin,adminOrAgant} = require('./routes/middleware/auth')
const loginRouter = require('./routes/AuthRouter/login')
const signupRoute =require('./routes/AuthRouter/signup')
const logoutRoute = require('./routes/AuthRouter/logout')
const loanRequestByUser = require('./routes/user/userRouter') 
const agentRouter = require('./routes/agent/agentRouter')
const adminRouter = require('./routes/admin/adminRouter')
const getAllUsersRouter = require('./routes/common/getAllUsers')

dataBase()

const app= express()
app.use(express.json());
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.RANDOMKEY]

}))
app.use(session({
    secret:process.env.RANDOMKEY,
    saveUninitialized:false,
    resave:false,
}))
app.use(cookieParser(process.env.RANDOMKEY))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport);

app.use('/login',loginRouter)
app.use('/signup',signupRoute)
app.use('/logout',logoutRoute)
app.use('/user',ifAuthenticated(),loanRequestByUser)
app.use('/agent',ifAuthenticated(),onlyAgent(),agentRouter)
app.use('/admin',ifAuthenticated(),onlyAdmin(),adminRouter)
app.use('/getallusers',ifAuthenticated(),adminOrAgant(),getAllUsersRouter)
app.get('/userdetails',(req,res)=>{
    if(req.user){
        res.status(200).json(req.user)
    }
    else{
        res.status(401).json('you are not authorized')
    }
})
app.listen(8080)

module.exports=app