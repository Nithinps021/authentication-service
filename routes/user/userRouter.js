const express = require('express');
const userRouter = express.Router();
const loanObj = require('../../db/loanObj');
const loanRequest = require('../../db/loanRequest');

const validateParams=(params)=>{
  if(params.amount===undefined){
    throw {message:'amount should be present'}
  }
  if(params.period === undefined){
    throw {message:'period should be present'}
  }
}

userRouter
  .route('/loanRequest')
  .get(async (req, res) => {
      try{
        const allLoanRequest = await loanObj.find({ userDetails: req.user._id });
        res.status(200).json(allLoanRequest);
      }
      catch(error){
          res.status(500).json(error)
      }
   
  })
  .post(async(req,res)=>{
    try{
        validateParams(req.body)
        const {period,amount}=req.body
        await loanObj.create({userDetails:req.user._id,period,amount})
        res.status(201).json({message:'loan request created'})
    }
    catch(error){
        res.status(500).json(error)
    }
  });
userRouter.route('/appliedLoans')
  .get(async(req,res)=>{
    try{
      const loans = await loanRequest.find({userDetails:req.user._id})
      res.status(200).json(loans)
    }
    catch(error){
      res.status(500).json(error)
    }
  })

module.exports = userRouter