const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    permLevel: Number,
    settings: {
        type: Object,
        default: {}
    },
    id: String
})

// mongoose knows that the name of collection is 'users' - converts to plural lowercase (apparently)
module.exports = mongoose.model("User", userSchema)