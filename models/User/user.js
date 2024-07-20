const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    googleSignedInUser: {
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        default: new Date()

    },
    modified: {
        type: Date,
        default: new Date()

    },
}, { versionKey: false });


module.exports = mongoose.model('User', userSchema);
