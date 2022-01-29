// const mongoClient = require("mongodb").MongoClient;
//const express = require("express")
// const http = require("http");
// const socketio = require("socket.io");
// const formatMessage = require("./utils/app");
// const path = require("path");

//----------------------------------------------------------------------------------------------------------------------
// db
// const chatCollection = "chats";
// const userCollection = "onlineUsers";
// io.on("connection", (socket) => {
//     console.log("new user logged in with ID" + socket.id);
//     // Messages are collected and are stored into the database
//     socket.on("chatMessage", (data) => { // gets message details from client and senders end
//         var dataElement = formatMessage(data);
//         mongoClient.connect(database, (err, db) => {
//             if (err)
//                 throw err;
//             else {
//                 var onlineUsers = db.db(dbname).collection(userCollection);
//                 var chat = db.db(name).collection(chatCollection);
//                 chat.insertOne(dataElement, (err, res) => { // puts messages into database
//                     if (err) throw err;
//                     socket.emit("message", dataElement); // user recieves message back for display
//                 });
//                 onlineUsers.findOne({ "name": data.toUser }, (err, res) => { // checks if the user of the message is online
//                     if (err) throw err;
//                     if (res != null) // if the user is online message will be relayed to him/her
//                         socket.to(res.ID).emit("message", dataElement);
//                 });
//             }
//             db.close();
//         });
//     });
//     var userID = socket.id;
//     socket.on("disconnect", () => {
//         mongoClient.connect(database, function (err, db) {
//             if (err) throw err;
//             var onlineUsers = db.db(dbname).collection(userCollection);
//             var myquery = { "ID": userID };
//             // if the user has been disconnected, they will be removed from the list of collections
//             onlineUsers.deleteOne(myquery, function (err, res) {
//                 if (err) throw err;
//                 console.log("User" + userID + "is Offline...");
//                 db.close();
//             });
//         });
//     });
// });

// ----------------------------------------------------------------------------------

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});