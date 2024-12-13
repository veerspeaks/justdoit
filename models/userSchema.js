const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Add any additional fields you want to store
    displayName: {
        type: String
    },
    photoURL: {
        type: String
    },
    // You can add more fields based on your requirements
});

module.exports = mongoose.model('User', userSchema);