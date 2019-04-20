const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['started', 'not-started', 'completed'],
        default: 'not-started'
    },
    userId: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        default: Date.now(),
        required: true
    },
    modifiedOn: {
        type: String,
        default: Date.now(),
        required: true
    },
    sharedTo: [],
    isFavourite: {
        type: Boolean,
        required: true,
        default: false
    },
    groupName: {
        type: String
    }
});

module.exports = mongoose.model('note', noteSchema);
