var express = require('express');
var router = express.Router();
//var db = require('mongoskin').db('localhost:27017/myblog');
//console.log(db)
var table = require('../mock/table.json')
var jz = require('../mock/jz.json')
/* GET users listing. */
// router.get('/',  function(req, res, next) {
//   console.log(req.body)
//   if(req.body.len==5){
//     const lists = table.lists.slice(0,5);
//     table.lists = lists
//     res.json(
//       table
//     )
//   }else{
//     res.json(
//       table
//     )
//   }
// });
router.get('/',  function(req, res, next) {
  //db.comments.find({})
  res.json(
    jz
  )
});

module.exports = router;