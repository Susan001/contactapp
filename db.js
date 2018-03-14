const extend = require('util')._extend;
let contact_counter= 0;
let db;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/assignment1";


module.exports = {
        init: function() {
            return new Promise(function (resolve, reject) {
                MongoClient.connect(url, function(err, client) {
                    if (err) {
                        reject(err);
                    } else {
                        db = client.db('assignment');
                        resolve();
                    }
                });

            })
        },
        insertOneContact:  function (contact){
            return new Promise(function(resolve, reject){
                //const newContact = extend({contactId: "hu"} contact);
                db.collection("Contacts").insertOne(contact, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        console.log("Success");
                        resolve(contact);
                    }
                });
            });
        },
        getAllContactsId: function(userId){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").find({userId}).toArray(function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        console.log("Success");
                        resolve(res);
                    }
                });
            });
            
        },
        deleteContact: function (contactId){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").deleteOne({contactId}, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        console.log("Success");
                        resolve(1);
                    }
                });
            });
        },
        updateContact: function (contactId, newData){
            return new Promise(function(resolve, reject){
                var newvalues = { $set: newData };
                db.collection("Contacts").updateOne({contactId}, newvalues, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        console.log("Success");
                        resolve(newData);
                    }
                });
            });
        },
        getUser: function(nickname){
            return new Promise(function(resolve, reject){
                db.collection("Users").find({nickname}).toArray(function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        console.log("Success");
                        resolve(res);
                    }
                });
            });
        },
        createUser: function(user){
            return new Promise(function(resolve, reject){
                db.collection("Users").insertOne(user, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        console.log("Success");
                        resolve(user);
                    }
                });
            });
        }
    }