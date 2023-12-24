const mongoose = require('mongoose');

let universitySchema = new mongoose.Schema({

   university: String,
   course: String,
   rank: Number,

});

let Lists = new mongoose.model('list', universitySchema);

module.exports = Lists;
