const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        changeInBalance: {
            type: String,
            required: true,
            trim: true,
        },
        created_at:{
            type: Date,
            required: true,
        }

    }
);

module.exports = mongoose.model('Record', recordSchema);
