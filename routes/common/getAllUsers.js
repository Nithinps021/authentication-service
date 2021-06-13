const express = require('express');
const getUsersRouter = express.Router();
const userdetails = require('../../db/userDetails');

getUsersRouter.route('/').get(async(req, res) => {
  try{
    const users = await userdetails.find({});
    res.status(200).json(users)
  }
  catch(error){
      res.status(500).json(error)
  }
});

getUsersRouter.route('/:id').put(async(req,res)=>{
    try{
        const id = req.params.id
        const detailsToUpdate=req.body.detailsToUpdate || {}
        if (Object.keys(detailsToUpdate).length===0){
            const user = await userdetails.findById({_id:id})
            res.status(200).json(user)
        }
        else{
            const user = await userdetails.updateOne({_id:id},detailsToUpdate)
            res.status(200).json(user)
        }
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = getUsersRouter