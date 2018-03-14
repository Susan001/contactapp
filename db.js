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
        getUser: function(email){
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
    }