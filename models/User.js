const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema);
User.createCollection();

module.exports = User;