const express = require('express')
const loginRouter = express.Router()
const passport=require('passport')

loginRouter
    .route('/')
    .post(
        passport.authenticate('local'),
        async(req,res)=>{
            if (req.user){
                res.status(200).send({message:'logged in'})
            }
        }
    )

module.exports=loginRouter