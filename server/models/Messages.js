const mongoose = require('mongoose');

const { Schema } = mongoose;
//const User = require('./User');

//messages schema
const messagesSchema = new Schema({
    messText: {
        type: String
    },
    messTime: {
        type: Number
    },
    messSender: {
        type: String
    },
    messReciever: {
        type: String
    }

});

const Messages = mongoose.model('Messages', messagesSchema);

//export Messages
module.exports = Messages;