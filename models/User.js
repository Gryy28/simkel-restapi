const mongoose = require('mongoose')
const moment = require('moment')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 45

    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
}, {
    versionKey: false
})
userSchema.method('toJSON', function () {
    const {
        _id,
        ...object
    } = this.toObject()
    object.id = _id
    return object
})
module.exports = mongoose.model('User', userSchema, 'user')