const extend = require('util')._extend;
let db;

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/test";


module.exports = {
        init: function() {
            return new Promise(function (resolve, reject) {
                MongoClient.connect(url, function(err, client) {
                    if (err) {
                        reject(err);
                    } else {
                        db = client.db('test');
                        resolve();
                    }
                });

            })
        },
        //to delete
        check: function(){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").find().toArray(function(err, res) {
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
        getAllContactsNickname: function(userNickname){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").find({userNickname}).toArray(function(err, res) {
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
        getContact: function(id){
            return new Promise(function(resolve, reject){
                console.log(id);
                db.collection("Contacts").find({"_id": ObjectID(id)}).toArray(function(err, res) {
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
        deleteContact: function (id){
            return new Promise(function(resolve, reject){
                console.log("versuch 2 "+ id);
                db.collection("Contacts").deleteOne({"_id": ObjectID(id)}, function(err, res) {
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
        updateContact: function (id, newData){
            return new Promise(function(resolve, reject){
                var newValues = { $set: newData };
                console.log(newValues);
                db.collection("Contacts").updateOne({"_id": ObjectID(id)}, newValues, function(err, res) {
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
        checkNickname: function(nickname){
            return new Promise(function(resolve, reject){
                db.collection("Users").find({nickname}, {nickname: 1}).toArray(function(err, res) {
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
    };