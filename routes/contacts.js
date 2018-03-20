const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */

router.get('/:usernickname', function(req, res, next) {
    db.getAllContactsNickname(req.params.usernickname).then(function(contacts){
      res.json(contacts);
      }).catch(next);
});
router.get('/', function(req, res, next) {
    db.check().then(function(contacts){
      res.json(contacts);
      }).catch(next);
});
router.put('/:id', function(req, res, next) {
    db.updateContact(req.params.id, req.body).then(function(newData){
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
  console.log(req.params.id);
    db.deleteContact(req.params.id).then(function(item){
      res.json({deleted:item});
      }).catch(next);
});
module.exports = router;
