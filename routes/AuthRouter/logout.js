const express = require('express');
const logoutRouter = express.Router();

logoutRouter.route('/').post(async (req, res) => {
  req.logOut();
  res.status(200).json({message:"successfully logged out"})
});

module.exports = logoutRouter;
