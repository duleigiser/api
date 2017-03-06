var express = require('express');
var router = express.Router();
var table = require('../mock/table.json')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    errNo: 1,
    data:table
  });
});

module.exports = router;
