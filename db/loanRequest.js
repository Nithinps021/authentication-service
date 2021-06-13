const mongoose = require('mongoose');

const loanRequest = mongoose.Schema({
  userDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userDetails',
  },
  amount: {
    type: Number,
    require: true,
  },
  interestRate: {
    type: Number,
    require: true,
  },
  period: {
    type: Number,
    require: true,
  },
  emi: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    default:'NEW'
  },
},{ timestamps: true });

module.exports = mongoose.model('loanRequest',loanRequest, 'loanRequest');
