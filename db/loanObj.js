const mongoose =require('mongoose')

const loanObj=mongoose.Schema({
    userDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDetails'
    },
    amount:{
        type:Number,
        require:true
    },
    period:{
        type:Number,
        require:true
    }
},{ timestamps: true })

module.exports = mongoose.model('loanObj',loanObj,'loanObj')