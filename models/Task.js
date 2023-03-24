const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: 'No description',
        required: false
    },
    is_completed: {
        type: Boolean,
        default: false,
        require: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('task', TaskSchema);
Task.createCollection();
module.exports = Task;