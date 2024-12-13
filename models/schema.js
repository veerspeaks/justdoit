const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Example', homeSchema);

