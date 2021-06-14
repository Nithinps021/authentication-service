const express = require('express');
const agentRouter = express.Router();
const loanObj = require('../../db/loanObj');
const loanRequest = require('../../db/loanRequest')


const validateParams=(params)=>{
  if(params.loanRequestId===undefined){
    throw {message:'loanRequestId field not present'}
  }
  if(params.rate===undefined){
    throw {message:'rate field not present'}

  }
}

agentRouter
  .route('/loanRequests')
  .get(async (req, res) => {
      try{
        const loanApplicatioFromCutomers = await loanObj.find({}).populate('userDetails');
        res.status(200).json(loanApplicatioFromCutomers);
      }
      catch(error){
          res.status(500).json(error)
      }
  })
agentRouter
  .route('/appliedLoans')
  .get(async(req,res)=>{
    try{
      const loans = await loanRequest.find({status:'NEW'}).populate('userDetails')
      res.status(200).json(loans)
    }
    catch(error){
      res.status(500).json(error)
    }
  })
  .post(async(req,res)=>{
    try{
        validateParams(req.body)
        const {loanRequestId}=req.body
        const rate = Number(req.body.rate)/(100*12)
        const loanDetails = await loanObj.findById({_id:loanRequestId})
        const {amount,period,userDetails}=loanDetails
        const emi=(amount*rate*Math.pow(1+rate,period))/(Math.pow(1+rate,period)-1)
        const loan={
            userDetails,
            amount,
            period,
            emi,
            interestRate:req.body.rate,
        }
        await loanRequest.create(loan)
        await loanObj.deleteOne({_id:loanRequestId})
        res.status(201).json({message:"Loan application submitted Successfully"})
    }
    catch(error){
        res.status(500).json({message:'Loan id not found'})
    }
  })

  agentRouter.route('/appliedLoans/:id')
    .put(async(req,res)=>{
      const id = req.params.id
      try{

        const loanDetails = await loanRequest.findById({_id:id})
        const {status,_id}=loanDetails
        if (status==='APPROVED'){
          res.status(403).send({message:"Loan has been approved and not able to change the details"})
        }
        else{
          const amount = req.body.amount || loanDetails.amount
          const period = req.body.period || loanDetails.period
          const interestRate = Number(req.body.interestRate || loanDetails.interestRate )/(100*12)
          const emi=(amount*interestRate*Math.pow(1+interestRate,period))/(Math.pow(1+interestRate,period)-1)
          await loanRequest.updateOne({_id},{emi,amount,period,interestRate:req.body.interestRate,})
          res.status(200).send({message:"The loan has been successfully updated"})
        }

      }
      catch(error){
        res.status(500).send(error)
      }
    })



module.exports = agentRouter