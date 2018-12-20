const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    googleID: String,
    image: String
});

module.exports = mongoose.model('User',userSchema);