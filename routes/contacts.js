const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.insertOneContact({
    userId: 2,
    firstName: "Anne",
    lastName: "Born",
    mobile: "1234567890",
    email: "mail@anne-born.de",
    facebook: "",
    imageUrl: "data:image/jpeg;base64,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"
});
    res.json( { title: 'Anne' });
});
router.get('/all', function(req, res, next) {
    const result = db.getAllContactsId(req.body.userId);
    res.json({hi: "hallo"});
});
router.put('/update', function(req, res, next) {
    db.updateContact(req.body);
        /**{
    userId: 2,
    contactId: 1,
    firstName: "Laura",
    lastName: "Khaze",
    mobile: "1234567890",
    email: "mail@anne-born.de",
    facebook: "",
    imageUrl: ""}
    */
    res.json({hi: "hu"});
});

router.post('/add', function(req, res, next){
    db.insertOneContact(req.body).then(function(id){
      res.json({contact: id});
      }).catch(next);
});

router.delete('/delete', function(req, res, next){
    db.deleteContact(req.body._id).then(function(id){
      res.json({contact: "gha"});
      }).catch(next);
});
module.exports = router;