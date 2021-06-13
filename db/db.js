const mongoose = require('mongoose')

const URI=process.env.MONGODB

const dataBase=async()=>{
    await mongoose.connect(URI,{useUnifiedTopology:true,useNewUrlParser:true})
}
module.exports = dataBase