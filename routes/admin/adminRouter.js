const express = require('express');
const adminRouter = express.Router();
const loanRequest = require('../../db/loanRequest');

adminRouter.route('/').get(async (req, res) => {
  const status = req.body.status || 'NEW';
  const allLoans = await loanRequest.find({ status: status });
  res.status(200).json(allLoans);
});
adminRouter.route('/:id').put(async (req, res) => {
  const { loanApproved } = req.body;
  const id = req.params.id;
//   console.log(, id);
  try {
    if (Boolean(loanApproved)===true) {

      await loanRequest.updateOne({ _id: id }, { status: 'APPROVED' });
      res.status(200).json({ message: 'loan Approved' });

    } else {

      await loanRequest.updateOne({ _id: id }, { status: 'REJECTED' });
      res.status(200).json({ message: 'loan not Approved' });

    }
  } catch (error) {

    res.status(500).json({ message: 'loanId not found' });
  }
});

module.exports = adminRouter;
