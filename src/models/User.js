const mongoose = require('mongoose');

const { Schema } = mongoose;
const Messages = require('./Messages');

//set up user Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    messages: [Messages.schema]
});

//set up password generator


//compare incoming password with protected password

const User = mongoose.model('User', userSchema);

module.exports = User;