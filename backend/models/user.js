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
}, { collection: 'users' });

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;