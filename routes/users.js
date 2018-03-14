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
    imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB"}).then(function(id){
      res.json({contact: id});
      }).catch(next);
});
router.get('/1', function(req, res, next) {
    /*const result = db.getAllContactsId(2);
    console.log(result +"hi");
    res.json(result);
    */
    
    db.getAllContactsId(2);
    res.json({"ja": "hu"});
    console.log("Jes")
  
});
router.get('/2', function(req, res, next) {
    db.updateContact({
    userId: 2,
    contactId: 1,
    firstName: "Laura",
    lastName: "Khaze",
    mobile: "1234567890",
    email: "mail@anne-born.de",
    facebook: "",
    imageUrl: ""});
    res.json({hi: "hu"});
});
module.exports = router;
