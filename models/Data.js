const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({

    pm25: {
        type: Number,
        required: true
    },
    pm10: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = Data = mongoose.model('data', DataSchema);