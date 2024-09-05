const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const dolistSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

Data = mongoose.model('todo', dolistSchema);
module.exports = Data