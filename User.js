const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    id: String
})

// mongoose knows that the name of collection is 'users' - converts to plural lowercase (apparently)
module.exports = mongoose.model("User", userSchema)