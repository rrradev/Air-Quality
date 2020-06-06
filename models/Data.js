const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    node: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = Data = mongoose.model('data', DataSchema);