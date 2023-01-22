const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    permLevel: Number,
    settings: {
        type: Object,
        default: {
            weightConfig: {
                speedingCount: 1,
                harshBrakingCount: 1,
                HarshAccelerationCount: 1,
                harshCorneringCOunt: 1,
                idlingCount: 1
            }
        }
    },
    id: String
})

// mongoose knows that the name of collection is 'users' - converts to plural lowercase (apparently)
module.exports = mongoose.model("User", userSchema)