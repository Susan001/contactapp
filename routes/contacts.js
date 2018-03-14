const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */

router.get('/:userid', function(req, res, next) {
    db.getAllContactsId(parseInt(req.params.userid,10)).then(function(contacts){
      res.json(contacts);
      }).catch(next);
});
router.put('/:id', function(req, res, next) {
    db.updateContact(parseInt(req.params.id,10), req.body).then(function(newData){
      res.json(newData);
      }).catch(next);
});

router.post('/', function(req, res, next){
    console.log(req.body);
    db.insertOneContact(req.body).then(function(id){
      res.json(id);
      }).catch(next);
});

router.delete('/:id', function(req, res, next){
    db.deleteContact(parseInt(req.params.id,10)).then(function(item){
      res.json({deleted:item});
      }).catch(next);
});
module.exports = router;
