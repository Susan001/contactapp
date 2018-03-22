let db;

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/contactapp";


module.exports = {
        init: function() {
            return new Promise(function (resolve, reject) {
                MongoClient.connect(url, function(err, client) {
                    if (err) {
                        reject(err);
                    } else {
                        db = client.db('contactapp');
                        resolve();
                    }
                });

            })
        },
        insertOneContact:  function (contact){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").insertOne(contact, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
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
                        resolve(res);
                    }
                });
            });
            
        },
        getContact: function(id){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").find({"_id": ObjectID(id)}).toArray(function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        resolve(res);
                    }
                });
            });
        },
        deleteContact: function (id){
            return new Promise(function(resolve, reject){
                db.collection("Contacts").deleteOne({"_id": ObjectID(id)}, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        resolve(1);
                    }
                });
            });
        },
        updateContact: function (id, newData){
            return new Promise(function(resolve, reject){
                var newValues = { $set: newData };
                db.collection("Contacts").updateOne({"_id": ObjectID(id)}, newValues, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
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
                        resolve(res);
                    }
                });
            });
        }, createUser: function(user){
            return new Promise(function(resolve, reject){
                db.collection("Users").insertOne(user, function(err, res) {
                    if (err){
                        reject(err);
                    }
                    else{
                        resolve(user);
                    }
                });
            });
        }
    };