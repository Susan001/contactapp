const MongoClient = require('mongodb').MongoClient;
const extend = require('util')._extend
const url = "mongodb://localhost:27017/";
let contact_counter= 0;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Assignment1");
  dbo.createCollection("Users", function(err, res) {
      if (err) throw err;
      console.log("users");
      db.close();
      
  });
  
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Assignment1");
  dbo.createCollection("Contacts", function(err, res) {
      if (err) throw err;
      console.log("Contacts");
      db.close();
      
  });
  
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Assignment1");
  dbo.createCollection("counters", function(err, res) {
      if (err) throw err;
      console.log("counters");
      db.close();
      
  });
  
});
//dbo.createCollection("Contacts", function(err, res) {if (err) throw err; console.log("Contacts")});
  //dbo.createCollection("counters", function(err, res) {if (err) throw err;console.log("counters")});
  //dbo.collection("counters").insertOne({_id: "userid", seq: 7}, function(err, res) {if (err) throw err;console.log("noop")});
  //db.close();

module.exports = {
    insertOneContact (contact){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Assignment1");
            const newContact = extend({_id: contact_counter}, contact);
            dbo.collection("Contacts").insertOne(newContact, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                return newContact._id;
            });
        });
    },
    getAllContactsId(userId){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Assignment1");
            dbo.collection("Contacts").find({userId}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                
                //db.close();
                return result;
            });
        });
    },
    deleteContact(_id){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Assignment1");
            dbo.collection("Contacts").deleteOne({_id}, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
            });
        });
    },
    updateContact(newData){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Assignment1");
            var newvalues = { $set: newData };
            dbo.collection("Contacts").updateOne({_id: newData._id}, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
                });
        });
    },
    getUser(email){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Assignment1");
            dbo.collection("Users").find({_id: email}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                return result;
            });
        });
    },
    createUser(user) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Assignment1");
            const newUser = extend({_id: user.email, password: user.password});
            dbo.collection("Users").insertOne(newUser, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }
};