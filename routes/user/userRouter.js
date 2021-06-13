const express = require('express');
const userRouter = express.Router();
const loanObj = require('../../db/loanObj');

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
        const {amount,period}=req.body
        await loanObj.create({userDetails:req.user._id,period,amount})
        res.status(201).json({message:'loan request created'})
    }
    catch(error){
        res.status(500).json(error)
    }
  });

module.exports = userRouter