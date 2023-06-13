const mongoose = require('mongoose')

const simkelSchema = mongoose.Schema({
    namaBarang: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    versionKey: false
})
module.exports = mongoose.model('Simkel', simkelSchema, "simkel");