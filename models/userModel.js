const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'User must have username'],
        unique: true, //user not taken
    },
    password: {
        type: String,
        require: [true, 'User must have password'],
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;