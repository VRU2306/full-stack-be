const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    taskDueDate: {
        type: Date,
        default: new Date()

    },
    created: {
        type: Date,
        default: new Date()

    },
    modified: {
        type: Date,
        default: new Date()

    },
    column: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Task', taskSchema);