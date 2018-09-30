const express = require('express');
const router = express.Router();

const apiVersion = '0.0.0'
const apiAuthor = 'Wolox'

router.use((req,res,next) => {
  res.header('Api-Version', apiVersion);
  next();
});

router.get('/', (req, res) => {
  res.json({
    version: apiVersion,
    author: apiAuthor,
    health: 'OK'
  });
});

//router.use('', someRoutes);

module.exports = router;