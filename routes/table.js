var express = require('express');
var router = express.Router();
var table = require('../mock/table.json')
/* GET users listing. */
router.post('/',  function(req, res, next) {
  res.json({
    data:table
  });
});

module.exports = router;
