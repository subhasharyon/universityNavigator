const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({

    name: String,
    email: String,
    phone: Number,
    password: String,
    confirmPassword: String,
    gender: String,
    profile: String,

});

let Students = new mongoose.model('student', studentSchema);

module.exports = Students;
