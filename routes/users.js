const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    db.createUser(req.body).then(function(id){
      res.json(id);
      }).catch(next);
});
router.get('/:nickname', function(req, res, next) {
     db.getUser(req.params.nickname).then(function(user){
      res.json(user);
      }).catch(next);
});
module.exports = router;
