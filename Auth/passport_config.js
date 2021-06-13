const passportLocal = require('passport-local').Strategy
const userlogin = require('../db/user')
const userDetails = require('../db/userDetails')
const bcrypt = require('bcrypt')

module.exports= function(passport){
    passport.use(
        new passportLocal(async(username,password,done)=>{
            try{
                const user= await userlogin.findOne({username:username})
                if (user){
                    const flag= await bcrypt.compare(password,user.password)
                    if (flag){
                        done(null,user)
                    }
                    else{
                        done(null,false)
                    }
                }
                else{
                    done(null,false )
                }
            }
            catch(err){
                done(err,false)
            }
        })
    )
    passport.serializeUser((user,callback)=>{
        callback(null,user.id)
    })
    passport.deserializeUser(async(id,callback)=>{
        try{
            const userData = await userDetails.findOne({userId:id})
            callback(null,userData)
        }
        catch(error){
            callback(error,null)
        }
    })
}