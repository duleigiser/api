var express = require('express');
var router = express.Router();
var table = require('../mock/table.json')

/* GET users listing. */
router.post('/',  function(req, res, next) {
  console.log(req.body)
  if(req.body.len==5){
    const lists = table.lists.slice(0,5);
    table.lists = lists
    res.json(
      table
    )
  }else{
    res.json(
      table
    )
  }
  
});

module.exports = router;
