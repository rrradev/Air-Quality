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
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = Data = mongoose.model('data', DataSchema);