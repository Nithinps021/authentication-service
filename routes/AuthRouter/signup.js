const express = require('express')
const signupRoute = express.Router()
const userData = require('../../db/user')
const userDetails = require('../../db/userDetails')
const bcrypt = require('bcrypt')
const passport = require('passport')

const createUser=()=>{
    return async(req,res,next)=>{
        const {
            username,
            password,
            name,
            age,
            role,
            phoneNumber
        } = req.body
        try{
            const user= await userData.findOne({username:username})
            if(user){
                res.status(401).send({message:"The username or email already present"})
            }
            else{
                const encrytedPassword =  await bcrypt.hash(password,10)
                const user= await userData.create({username,password:encrytedPassword})
                await userDetails.create({username,name,age,role,phoneNumber,userId:user._id})
                next()
            }
        }
        catch(error){
            res.status(401).send({message:"Something went wrong"})
        }
    }
}

signupRoute
    .route('/')
    .post(
        createUser(),
        passport.authenticate('local'),
        (req,res)=>{
            if (req.user){
                res.status(201).send({message:"user created successfully"})
            }
        }
    )

module.exports=signupRoute