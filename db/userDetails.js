const mongoose = require('mongoose')

const userDetails = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true    
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    role:{
        type:String,
    },
    phoneNumber:{
        type:String
    }
})


module.exports = mongoose.model('userDetails',userDetails,'userDetails')