const mongoose = require('mongoose');

// Defined the schema for the User model
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email : String,
    password: String,
    created: {
        type: Date,
        default: Date.now

    },
    updated: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;