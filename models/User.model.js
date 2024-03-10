const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullname: String,
    email: String,
    mobile: String,
    password: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;