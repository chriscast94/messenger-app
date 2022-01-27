const mongoClient = require("mongodb").MongoClient;
const express = require("express") = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/app");
const path = require("path");


mongo.connect('mongo://127.0.0.1/messenger-app'function (err, db) {
    if (err) {
        throw err;
    }

    console.log('MongoDB connected...');

    client.on(connection', function(socket){
        let chat = db.collection("chats");

    sendStatus = function (s) {
        socket.emit("status", s);
    }
}
    chat.find().limit(100.sort({ _id: 1 }).toArray(function (err, res) {
    if (err) {
        throw err;
    }
}

    sockit.emit(out)






})) app. })